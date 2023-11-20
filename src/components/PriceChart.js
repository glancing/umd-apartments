import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const PriceChart = ({ data }) => {
  const groupedData = [];
  data.forEach(item => {
    if (!groupedData[item.roomtype]) {
        groupedData[item.roomtype] = [];
    }
    groupedData[item.roomtype].push(item);
  });

  const uniqueDates = Array.from(new Set(data.map(item => item.date)));
  console.log(uniqueDates)
  console.log(data)

  const lines = Object.keys(groupedData).map((roomtype, index) => (
    <Line
        key={roomtype}
        type="monotone"
        dataKey="price"
        data={groupedData[roomtype]}
        name={roomtype}
        stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}    
      />
  ));

  const formatXAxis = (tickItem) => {
    return new Date(tickItem).toDateString();
  };

  return (
    <LineChart width={400} height={300} data={data}>
      <XAxis dataKey="date" ticks={uniqueDates} tickFormatter={formatXAxis} domain={[data.startDate, data.endDate]} />
      <YAxis dataKey="price"/>
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      {lines}
    </LineChart>
  );
};

export default PriceChart;