import axios from "axios";
import "../src/assets/styles/App.css";
import Layout from "./components/Layout";
import { useState, useEffect } from "react";

function App() {
  const [pasienData, setPasienData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/pasien")
      .then((res) => {
        setPasienData(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main>
      <Layout>
        <div className="search-filter mb-3">
          <div>
            <h4>
              <b>Daftar Pasien</b>
            </h4>
          </div>
          <div>
            <input
              type="submit"
              className="button button-nonaktif me-3"
              value="Non-Aktifkan"
            ></input>
            <input
              type="submit"
              className="button button-tambah"
              value="Tambah Pasien"
            ></input>
          </div>
        </div>

        <div className="content">
          <div className="search-filter">
            <div>
              <select name="example" className="combo-status me-3">
                <option selected hidden disabled>
                  Semua Status
                </option>
                <option value="B">B</option>
                <option value="-">Other</option>
              </select>
              <select name="example" className="combo-urutan">
                <option selected hidden disabled>
                  Urut Berdasarkan
                </option>
                <option value="B">B</option>
                <option value="-">Other</option>
              </select>
            </div>
            <input
              type="text"
              className="search-pasien"
              placeholder="Cari nama pasien"
              name="search"
            ></input>
          </div>
          <table className="table-pasien mt-3">
            <tr>
              <th className="check-th">
                <input type="check" className="check-pasien"></input>
              </th>
              <th>Nama</th>
              <th>No ID</th>
              <th>No Telpon</th>
              <th>Asuransi</th>
              <th>Appointment Berikutnya</th>
            </tr>
            {pasienData.length > 0 &&
              pasienData.map((pasien, idx) => (
                <tr>
                  <td className="check-th">
                    <input type="check" className="check-pasien"></input>
                  </td>
                  <td>
                    <p>{pasien.nama}</p>
                    <p>{pasien.isActive ? "Aktif" : "Nonaktif"}</p>
                  </td>
                  <td>{pasien.id}</td>
                  <td>{pasien.notelp}</td>
                  <td>-</td>
                  <td>
                    <p>Eyelash Variant 1</p>
                    <p>Rabu, 21 Januari 2021 : 14.30 - 15.30</p>
                  </td>
                </tr>
              ))}
          </table>
        </div>
      </Layout>
    </main>
  );
}

export default App;
