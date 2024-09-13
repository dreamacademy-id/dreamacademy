import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SalesChart = () => {
  const chartoptions = {
    series: [
      {
        name: "Nilai TO",
        data: [0, 31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "Tes Potensi Skolastik",
        data: [0, 11, 32, 45, 32, 34, 52, 41],
      },
      {
        name: "Tes Literasi",
        data: [0, 20, 12, 75, 42, 14, 72, 21],
      },
    ],
    options: {
      chart: {
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        strokeDashArray: 3,
        borderColor: "rgba(0,0,0,0.1)",
      },

      stroke: {
        curve: "smooth",
        width: 1,
      },
      xaxis: {
        categories: [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
        ],
      },
    },
  };
  return (
    <Card>
      <CardBody className="text-center">
        <CardTitle tag="h5">Sales Summary</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
          Yearly Sales Report
        </CardSubtitle>
        <Chart
        className="d-flex justify-content-center"
          type="area"
          // width="60%"
          width={window.innerWidth < 576 ? "100%" : "60%"}
          height="290"
          options={chartoptions.options}
          series={chartoptions.series}
        />
      </CardBody>
    </Card>
  );
};

export default SalesChart;
