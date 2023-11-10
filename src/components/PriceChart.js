import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const PriceChart = ({ data }) => {
  const groupedData = {};

  data.forEach(item => {
      if (!groupedData[item.lease_year]) {
          groupedData[item.lease_year] = [];
      }
      groupedData[item.lease_year].push(item);
  });

  const lineColors = ['red', 'blue']; // You can define different colors for lines

  const lines = Object.keys(groupedData).map((leaseYear, index) => (
    <Line
        key={leaseYear}
        type="monotone"
        dataKey="price"
        data={groupedData[leaseYear]}
        name={leaseYear}
        stroke={lineColors[index % lineColors.length]}
    />
  ));

  return (
    <LineChart width={400} height={300} data={data}>
      <XAxis dataKey="date" />
      <YAxis dataKey="price"/>
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      {lines}
    </LineChart>
  );
};

export default PriceChart;