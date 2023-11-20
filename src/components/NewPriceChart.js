import { LineChart, CartesianGrid, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function NewPriceChart({ data, roomtype_to_rent }) {
    // Example data for three stocks over time
    const roomtypes = Object.keys(roomtype_to_rent);

    const minY = Math.min(...data.map(entry => Math.min(...Object.values(entry).slice(1))));
    const maxY = Math.max(...data.map(entry => Math.max(...Object.values(entry).slice(1))));  

    const lineColors = [
      '#1f77b4', // Blue
      '#ff7f0e', // Orange
      '#2ca02c', // Green
      '#d62728', // Red
      '#9467bd', // Purple
      '#8c564b', // Brown
      '#e377c2', // Pink
      '#7f7f7f', // Gray
      '#bcbd22', // Olive
      '#17becf', // Teal
      '#1f77b4', // Light Blue
      '#ff7f0e', // Light Orange
      '#2ca02c', // Light Green
      '#d62728', // Light Red
      '#9467bd', // Light Purple
      '#8c564b', // Light Brown
    ];

    return (
        <LineChart width={400} height={300} data={data}>
          <XAxis dataKey="date" />
          <YAxis domain={[minY - 10, maxY + 10]} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          {roomtypes.map((roomtype, index) => (
            <Line key={index} type="monotone" dataKey={roomtype} stroke={lineColors[index]} />
          ))}
        </LineChart>
    );
  }