import React from "react";
import { useTranslation } from "react-i18next";

const SizeChart = () => {
  const { t } = useTranslation();

  const headers = t("sizeChart.tableHeaders", { returnObjects: true });
  const rows = t("sizeChart.rows", { returnObjects: true });

  return (
    <div className="pt-5">
      <div className="tabs-ac-style d-md-none main-title-2" id="size-chart">
        {t("sizeChart.title")}
      </div>
      <div id="size-chart" className="tab-content">
        <div className="mb-2 main-title-2">
          {t("sizeChart.readyToWearTitle")}
        </div>
        <div className="mb-4 desc-content">
          {t("sizeChart.readyToWearDesc")}
        </div>
        <div className="size-chart-tbl table-responsive px-1">
          <table className="table-bordered align-middle mb-0">
            <thead>
              <tr>
                {headers.map((header, idx) => (
                  <th key={idx}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(rows).map(([region, sizes]) => (
                <tr key={region}>
                  <th>{region}</th>
                  {sizes.map((size, idx) => (
                    <td key={idx}>{size}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SizeChart;
