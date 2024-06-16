import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import PropTypes from "prop-types";

const COLORS = ["#00C49F", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const SurveyorPiechart = ({ vote }) => {
  const yesVotes = vote.filter((v) => v.vote === "yes").length;
  const noVotes = vote.filter((v) => v.vote === "no").length;

  // Create the data array
  const data = [
    { name: "Yes", value: yesVotes },
    { name: "No", value: noVotes },
  ];
  return (
    <div>
      <div className="flex gap-3">
        <div className="h-5 w-5 bg-[#00C49F]"></div> :<span>Yes</span>
      </div>
      <div className="flex gap-3">
        <div className="h-5 w-5 bg-[#FF8042]"></div> :<span>No</span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

SurveyorPiechart.propTypes = {
  vote: PropTypes.object,
};

export default SurveyorPiechart;
