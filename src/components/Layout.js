import React from "react";
import Header from "./Header";

import img from "../assets/images/hola.png";
import "../assets/styles/Layout.css";

function Layout({ children }) {
  return (
    <main>
      <aside>
        <img src={img} alt="logo"></img>
        <label class="bi bi-people-fill">User</label>
        <div className="layout-tab">
          <a href="/">Tenaga Medis</a>
          <a href="/" className="active">
            Pasien
          </a>
          <a href="/">Daftar User</a>
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
