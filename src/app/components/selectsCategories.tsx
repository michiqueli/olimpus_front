"use client";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { getProductTypes } from "@/Redux/sliceProducts";
import { getAllTypes } from "@/Redux/Actions";

interface Item {
  id: number;
  name: string;
  metric: string;
  Type: {
    name: string;
  };
}

const SelectsCategories: React.FC = () => {
  const dispatch = useAppDispatch();
  const [types, setTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [subTypes, setSubTypes] = useState<string[]>([]);
  const [selectedSubType, setSelectedSubType] = useState<string>("");
  const [metrics, setMetrics] = useState<string[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<string>("");

  const data: Item[] = useAppSelector(getProductTypes);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAllTypes(dispatch);
        const uniqueTypes = [...new Set(data.map((item) => item.Type.name))];
        setTypes(uniqueTypes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, data]);

  useEffect(() => {
    if (selectedType) {
      const uniqueSubTypes = [
        ...new Set(
          data
            .filter((item) => item.Type.name === selectedType)
            .map((item) => item.name)
        ),
      ];
      setSubTypes(uniqueSubTypes);
    }
  }, [selectedType, data]);

  useEffect(() => {
    if (selectedSubType) {
      const uniqueMetrics = data
        .filter(
          (item) =>
            item.Type.name === selectedType && item.name === selectedSubType
        )
        .map((item) => item.metric);
      setMetrics(uniqueMetrics);
    }
  }, [selectedType, selectedSubType, data]);

  return (
    <div>
      <select
        id="typeSelect"
        onChange={(e) => setSelectedType(e.target.value)}
        value={selectedType}
      >
        <option value="">Seleccione Categoria</option>
        {types.map((type, id) => (
          <option key={id} value={type}>
            {type}
          </option>
        ))}
      </select>
      <select
        id="subTypeSelect"
        onChange={(e) => setSelectedSubType(e.target.value)}
        value={selectedSubType}
      >
        <option value="">Seleccione Sub-categoria</option>
        {subTypes.map((subType, id) => (
          <option key={id} value={subType}>
            {subType}
          </option>
        ))}
      </select>
      <select
        id="metricSelect"
        onChange={(e) => setSelectedMetric(e.target.value)}
        value={selectedMetric}
      >
        <option value="">Seleccione Medida</option>
        {metrics.map((metric, id) => (
          <option key={id} value={metric}>
            {metric}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectsCategories;
