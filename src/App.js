import axios from "axios";
import "../src/assets/styles/App.css";
import Layout from "./components/Layout";
import { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/id";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  moment.locale("id");
  const [pasienData, setPasienData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/pasien")
      .then((res) => {
        console.log(res.data.items);
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
            <button className="button button-nonaktif me-3">
              <b class="bi bi-person-dash"></b> Non-Aktifkan
            </button>
            <button className="button button-tambah">
              <b class="bi bi-person-plus"></b> Tambah Pasien
            </button>
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
                    <p>
                      {pasien.treatment.length > 0 ? (
                        <>
                          <i class="bi bi-stars"> </i>
                          {pasien.treatment[0].nama}
                        </>
                      ) : (
                        "-"
                      )}
                    </p>
                    <p>
                      {pasien.treatment.length > 0 ? (
                        <>
                          <i class="bi bi-calendar-week"> </i>
                          `$
                          {moment(pasien.treatment[0].waktu).format(
                            " dddd, DD MMM YYYY: HH:mm -"
                          )}{" "}
                          $
                          {moment(pasien.treatment[0].waktu)
                            .add(1, "h")
                            .format("HH:mm")}
                          `
                        </>
                      ) : (
                        "-"
                      )}
                    </p>
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
