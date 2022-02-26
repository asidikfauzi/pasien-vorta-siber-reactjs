import React from "react";
import Header from "./Header";

import img from "../assets/images/hola.png";
import "../assets/styles/Layout.css";

function Layout({ children }) {
  return (
    <main>
      <aside>
        <img src={img} alt="logo"></img>
        <i class="bi bi-people-fill">User</i>
        <div className="layout-tab">
          <a>Tenaga Medis</a>
          <a className="active">Pasien</a>
          <a>Daftar User</a>
        </div>
      </aside>
      <section className="right-side">
        <Header />
        <section className="child">{children}</section>
      </section>
    </main>
  );
}

export default Layout;
