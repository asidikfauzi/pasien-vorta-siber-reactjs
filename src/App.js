import axios from "axios";
import "../src/assets/styles/App.css";
import Layout from "./components/Layout";
import { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/id";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import DatePicker from "sassy-datepicker";

function App() {
  moment.locale("id");
  const [pasienData, setPasienData] = useState([]);
  const [lokasiData, setLokasiData] = useState([]);
  const [reload, setReload] = useState(false);
  const [shownModal, setShownModal] = useState(false);
  const [shownAccModal, setShownAccModal] = useState(false);
  const [body, setBody] = useState({});
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const dateHandler = (date) => {
    const waktu = moment(date).format("YYYY-MM-DD");
    setDate(waktu);
    // console.log(moment(date).format("DD-MM-YYYY"));
  };

  const timeHandler = (e) => {
    setTime(e.target.value);
    // setBody({ ...body, waktu: `${date} ${e.target.value}` });
    // console.log(e.target.value);
  };

  const showModal = () => {
    setShownModal(true);
  };

  const hideModal = () => {
    setDate(null);
    setTime(null);
    setShownModal(false);
  };

  const showAccModal = () => {
    setShownAccModal(true);
  };

  const hideAccModal = () => {
    setShownAccModal(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/pasien")
      .then((res) => {
        setPasienData(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reload]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/lokasi")
      .then((res) => {
        setLokasiData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reload]);

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
              <b className="bi bi-person-dash"></b> Non-Aktifkan
            </button>
            <button className="button button-tambah">
              <b className="bi bi-person-plus"></b> Tambah Pasien
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
            <div className="search-pasien">
              <input
                type="text"
                className="input-search"
                placeholder="Cari nama pasien"
              ></input>
              <i className="bi bi-search"></i>
            </div>
          </div>
          <table className="table-pasien mt-3">
            <tr className="table-header">
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
                <tr key={pasien.id}>
                  <td className="check-th">
                    <input type="check" className="check-pasien"></input>
                  </td>
                  <td>
                    <p>{pasien.nama}</p>
                    <p
                      className={`p-isActive ${
                        pasien.isActive ? "p-active" : "p-nonactive"
                      }`}
                    >
                      {pasien.isActive ? "Aktif" : "Non-Aktif"}
                    </p>
                  </td>
                  <td>{pasien.id}</td>
                  <td>{pasien.notelp}</td>
                  <td>-</td>
                  <td>
                    <div className="appointment">
                      <div>
                        {pasien.treatment.length > 0 ? (
                          <>
                            <p className="bold">
                              <i className="bi bi-stars color-bi"> </i>
                              {pasien.treatment[0].nama}
                            </p>
                            <p>
                              <i className="bi bi-calendar-week color-bi"> </i>
                              <span className="bold">
                                {moment(pasien.treatment[0].waktu).format(
                                  " dddd, DD MMM YYYY:"
                                )}{" "}
                              </span>
                              {moment(pasien.treatment[0].waktu).format(
                                " HH:mm -"
                              )}{" "}
                              {moment(pasien.treatment[0].waktu)
                                .add(1, "h")
                                .format("HH:mm")}
                            </p>
                          </>
                        ) : (
                          "-"
                        )}
                      </div>
                      <div className="appointment-dropdown">
                        <i className="bi bi-three-dots-vertical icon-dropdown"></i>
                        <div className="dropdown-content">
                          <span
                            onClick={() => {
                              showModal();
                              setBody({
                                ...body,
                                id: pasien.id,
                                nama: pasien.nama,
                                treatment: pasien.treatment[0],
                              });
                            }}
                          >
                            <i className="bi bi-calendar-week"> </i> Ubah
                            Appointment
                          </span>
                          <span
                            onClick={() => {
                              pasien.isActive
                                ? axios
                                    .put(
                                      `http://localhost:3000/pasien/nonaktif/${pasien.id}`
                                    )
                                    .then((res) => {
                                      setReload(!reload);
                                      console.log(res.data.message);
                                    })
                                    .catch((err) => {})
                                : axios
                                    .put(
                                      `http://localhost:3000/pasien/aktif/${pasien.id}`
                                    )
                                    .then((res) => {
                                      setReload(!reload);
                                      console.log(res.data.message);
                                    })
                                    .catch((err) => {});
                            }}
                            className={
                              pasien.isActive ? "span-nonaktif" : "span-aktif"
                            }
                          >
                            {pasien.isActive ? (
                              <>
                                <i className="bi bi-person-dash"></i>{" "}
                                Non-Aktifkan
                              </>
                            ) : (
                              <>
                                <i className="bi bi-person-check"></i> Aktifkan
                              </>
                            )}
                          </span>
                          <span>
                            <i className="bi bi-pen-fill"> </i> Ubah Data
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </table>
        </div>
      </Layout>

      <Modal size="lg" show={shownModal} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>
            Ubah Jadwal Appointment - {body.nama}
            <label name="namamodal" placeholder="aaaa"></label>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="div-warning">
            <i className="bi bi-exclamation-circle"></i> Masukkan informasi
            jadwal appointment baru untuk pasien, {body.nama}
          </div>
          <div className="flex-modal">
            <div className="left-modal">
              <b className="mt-3 mb-2">Treatment</b>
              <select name="example" className="combo-modal">
                <option value={body.treatment.nama} selected hidden disabled>{body.treatment.nama}</option>
                <option value="Eyelash Variant 1">Eyelash Variant 1</option>
                <option value="Eyelash Variant 2">Eyelash Variant 2</option>
                <option value="Eyelash Variant 3">Eyelash Variant 3</option>
                <option value="Eyelash Variant 4">Eyelash Variant 4</option>
              </select>
              <b className="mt-3 mb-2">Tanggal </b>
              <DatePicker onChange={dateHandler} />
            </div>
            <div className="right-modal">
              <b className="mt-3 mb-2">Lokasi</b>
              <select name="example" className="combo-modal">
                {lokasiData.length > 0 &&
                  lokasiData.map((lokasi, idx) => (
                    <>
                      <option value={lokasi.id}>{lokasi.nama}</option>
                    </>
                  ))}
                ;
              </select>
              <b className="mt-3 mb-2">Waktu</b>
              <form onChange={timeHandler} className="waktu">
                <input
                  type="radio"
                  className="btn-check"
                  name="waktu"
                  value="12:30"
                  id="option1"
                />
                <label className="btn btn-outline-secondary" for="option1">
                  12.30
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  name="waktu"
                  value="13:00"
                  id="option2"
                />
                <label className="btn btn-outline-secondary" for="option2">
                  13.00
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  name="waktu"
                  value="13:30"
                  id="option3"
                />
                <label className="btn btn-outline-secondary" for="option3">
                  13.30
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  name="waktu"
                  value="14:00"
                  id="option4"
                />
                <label className="btn btn-outline-secondary" for="option4">
                  14.00
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  name="waktu"
                  value="14:30"
                  id="option5"
                />
                <label className="btn btn-outline-secondary" for="option5">
                  14.30
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  name="waktu"
                  value="15:00"
                  id="option6"
                />
                <label className="btn btn-outline-secondary" for="option6">
                  15.00
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  name="waktu"
                  value="15:30"
                  id="option7"
                />
                <label className="btn btn-outline-secondary" for="option7">
                  15.30
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  name="waktu"
                  value="16:00"
                  id="option8"
                />
                <label className="btn btn-outline-secondary" for="option8">
                  16.00
                </label>
              </form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideModal}>
            <i class="bi bi-x"> </i> Batal
          </Button>
          <Button
            variant="primary"
            onClick={showAccModal}
            disabled={date && time ? false : true}
          >
            <i class="bi bi-check2-all"> </i> Simpan
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal size="lg" show={shownAccModal} onHide={hideAccModal}>
        <Modal.Body>
          <h5>
            Apakah jadwal appointment yang dimasukkan untuk Angga Yarro sudah
            benar ?
          </h5>
          <div className="flex-acc-modal">
            <div>
              <i className="bi bi-stars icon-color-acc"> </i>
              <b>Service</b>
            </div>
            <div>
              <i className="bi bi-calendar-week icon-color-acc"></i>
              <b>Date {`&`} Time</b>
            </div>
            <div>
              <i class="bi bi-geo icon-color-acc"></i>
              <b>Lokasi</b>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideAccModal}>
            <i class="bi bi-x"> </i> Batal
          </Button>
          <Button variant="primary" onClick={showAccModal}>
            <i class="bi bi-check2-all"> </i> Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}

export default App;
