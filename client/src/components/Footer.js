import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer_top">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-md-6 col-lg-3">
                <div className="footer_widget">
                  <div className="footer_logo">
                    <a href="#">
                      <img
                        style={{ width: "200px" }}
                        src="/img/final_footer.png"
                        alt=""
                      />
                    </a>
                  </div>
                  <p>
                    <a href="#">support@marocestate.ma</a> <br />
                    +212 575 963 212 <br />
                    20100, Bouskoura, Casablanca
                  </p>
                  <div className="socail_links">
                    <ul>
                      <li>
                        <a href="#">
                          <i className="ti-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="ti-twitter-alt"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-instagram"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-md-6 col-lg-3">
                <div className="footer_widget">
                  <h3 className="footer_title">Services</h3>
                  <ul>
                    <li>
                      <a href="#">Publier annonce</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-2 col-md-6 col-lg-2">
                <div className="footer_widget">
                  <h3 className="footer_title">Liens utiles</h3>
                  <ul>
                    <li>
                      <a href="#"> Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-4 col-md-6 col-lg-4">
                <div className="footer_widget">
                  <h3 className="footer_title">Abonnez-vous</h3>
                  <form action="#" className="newsletter_form">
                    <input type="text" placeholder="Entrez votre e-mail" />
                    <button type="submit">S'abonner</button>
                  </form>
                  <p className="newsletter_text">
                    Abonnez-vous à notre newsletter pour recevoir les dernières
                    annonces.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copy-right_text">
          <div className="container">
            <div className="footer_border"></div>
            <div className="row">
              <div className="col-xl-12">
                <p className="copy_right text-center">
                  Copyright &copy;
                  <script>document.write(new Date().getFullYear());</script> All
                  rights reserved | Saad MOUTALIB & Monsif ALLALI
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
