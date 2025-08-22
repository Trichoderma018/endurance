// src/Report.jsx
import React, { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import getData from "../services/Llamados.jsx";
import "../style/report.css";

export default function Report() {
  const [genero, setGenero] = useState([]);
  const [sede, setSede] = useState([]);
  const [beca, setBeca] = useState([]);
  const [edad, setEdad] = useState([]);
  const reportRef = useRef();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData("/api/expedientes");
        setGenero(data.genero);
        setSede(data.sede);
        setBeca(data.beca);
        setEdad(data.edad);
      } catch (err) {
        console.error("Error cargando datos:", err);
      }
    }
    fetchData();
  }, []);

  const downloadPDF = async () => {
    const input = reportRef.current;
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("reporte_alumnos.pdf");
  };

  // Función para armar tabla
  const Tabla = ({ data, label }) => (
    <div className="table-container">
      <h3>{label}</h3>
      <table
        border="1"
        cellPadding="6"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>{label}</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r, i) => (
            <tr key={i}>
              <td>{Object.values(r)[0]}</td>
              <td>{r.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div style={{ padding: 16 }}>
      <h1>Reporte de Alumnos</h1>

      <div ref={reportRef} style={{ background: "#fff", padding: 20 }}>
        {/* 🔹 Género */}
        <h2>Por Género</h2>
        <Chart
          type="pie"
          options={{ labels: genero.map((x) => x.genero) }}
          series={genero.map((x) => x.total)}
          height={300}
        />
        <Tabla data={genero} label="Género" />

        {/* 🔹 Sede */}
        <h2>Por Sede</h2>
        <Chart
          type="bar"
          options={{ xaxis: { categories: sede.map((x) => x.sede) } }}
          series={[{ name: "Total", data: sede.map((x) => x.total) }]}
          height={300}
        />
        <Tabla data={sede} label="Sede" />

        {/* 🔹 Beca */}
        <h2>Por Beca</h2>
        <Chart
          type="donut"
          options={{ labels: beca.map((x) => x.beca) }}
          series={beca.map((x) => x.total)}
          height={300}
        />
        <Tabla data={beca} label="Beca" />

        {/* 🔹 Edad */}
        <h2>Por Edad</h2>
        <Chart
          type="line"
          options={{ xaxis: { categories: edad.map((x) => x.edad) } }}
          series={[{ name: "Total", data: edad.map((x) => x.total) }]}
          height={300}
        />
        <Tabla data={edad} label="Edad" />
      </div>

      <button onClick={downloadPDF} style={{ marginTop: 20 }}>
        Exportar a PDF
      </button>
    </div>
  );
}