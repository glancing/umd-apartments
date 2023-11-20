import { useState, useEffect, useRef } from 'react';

export default function ReviewModal({ submitReview, isModalOpen, setIsModalOpen, closeModal }) {
  const [rating, setRating] = useState(0);
  const [reviewMessage, setReviewMessage] = useState('');
  const modalRef = useRef(null);

  useEffect(() => {
    // Attach the event listener when the modal is open
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    }

    if (isModalOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      // Remove the event listener when the modal is closed
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isModalOpen, closeModal]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  }

  const handleReviewMessageChange = (event) => {
    setReviewMessage(event.target.value);
  }

  return (
    <div className="review-modal">
      <div className="modal-content" ref={modalRef}>
        <div className="inner-modal">
          <span className="close" onClick={closeModal}>&times;</span>
          <h3>Write a Review</h3>
          <div className='stars'>
            <label>Rating:</label>
            <div className="review-stars">
              {[1, 2, 3, 4, 5].map((value) => (
                <span
                  key={value}
                  className={`star ${value <= rating ? 'selected' : ''}`}
                  onClick={() => handleRatingChange(value)}
                >
                  &#9733;
                </span>
              ))}
            </div>
          </div>
          <div className='review-modal-message'>
            <label>Review Message:</label>
            <textarea
              value={reviewMessage}
              onChange={handleReviewMessageChange}
            />
            <button className="details-btn" onClick={() => submitReview(rating, reviewMessage)}>Submit Review</button>
          </div>
        </div>
      </div>
    </div>
  );
}