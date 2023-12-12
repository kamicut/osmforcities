import React from "react";
import { notFound } from "next/navigation";
import { fetchRegion } from "./fetch";
import Breadcrumbs from "../../components/breadcrumbs";
import Table, { Column } from "@/app/components/table";
import { CityStats } from "@prisma/client";

type RegionPageProps = {
  params: {
    countrySlug: string;
    regionSlug: string;
  };
};

export const formatToPercent = (value: number) => {
  const percentage = value * 100;
  // Check if the percentage is an integer
  if (percentage % 1 === 0) {
    // If it is an integer, return without decimals
    return `${percentage}%`;
  } else {
    // If it is not an integer, return with two decimal places
    return `${percentage.toFixed(1)}%`;
  }
};

const RegionPage = async (props: RegionPageProps) => {
  const { regionSlug, countrySlug } = props.params;

  const region = await fetchRegion({
    countrySlug,
    regionSlug,
  });

  if (!region) {
    return notFound();
  }

  const cities = region.cities.sort((a, b) => {
    if (!a.stats || !b.stats) return 0;

    return a.stats.presetsCount > b.stats.presetsCount ? -1 : 1;
  });

  type CityType = (typeof cities)[0];

  // Define the columns for the cities table
  const columns: Column<CityType>[] = [
    {
      title: "Name",
      dataIndex: "name",
      render: (value: string, record: CityType) => (
        <a href={record.url} className="text-blue-600 hover:text-blue-800">
          {value}
        </a>
      ),
      align: "left",
    },
    {
      title: "# of presets",
      dataIndex: "stats",
      render: (value: CityStats) => value?.presetsCount || "-",
      align: "center",
    },
    {
      title: "coverage (%)",
      dataIndex: "stats",
      render: (value: CityStats) =>
        value?.requiredTagsCoverage
          ? formatToPercent(value.requiredTagsCoverage)
          : "-",
      align: "center",
    },
  ];

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", url: "/" },
          { label: region.country.name, url: region.country.url },
          { label: region.name, isLast: true },
        ]}
      />
      <h1 className="text-center text-2xl font-bold mb-6">
        Cities of {region.name}, {region.country.name}
      </h1>
      <Table columns={columns} data={cities} />
    </>
  );
};

export default RegionPage;