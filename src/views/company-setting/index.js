import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";

import Identite from "../../components/form-company/Identite";
import Marque from "../../components/form-company/marque";
import Catalogue from "../../components/form-company/catalogue";
import { setFormStage } from "../../store/rootSlice";
import Cible from "../../components/form-company/cible";
import Article from "../../components/form-company/article";
import "./styles.scss";
import { getProfile } from "../../lib/crud";
import { setCatalogue, setProfil, setRegister } from "../../store/profileSlice";
import { checkAuth } from "../../lib/auth";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageLoading from "../../components/PageLoading";

function CompanySetting() {
  const navigate = useNavigate();
  const pageStage = useSelector((state) => state.root.FormStage);
  const dispatch = useDispatch();
  const identite = useSelector((state) => state.profile.identite);
  const [loading, setLoading] = useState(true);
  const handleNextForm = (id) => {
    if (Object.keys(identite).length !== 0) {
      console.log("identite is ", identite);
      console.log("+++++++ moving to the next form");
      dispatch(setFormStage(id));
    } else {
      toast.warn("Vous devez remplir le formulaire identité d'abord  !", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log("cannot move to the next form .....identitie is empty");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    checkAuth(token)
      .then((res) => res.data)
      .then((data) => {
        getProfile(token)
          .then((res) => res.data)
          .then((data) => {
            dispatch(setProfil(data));
            console.log("profile was dispached");
            setLoading(false);
          });
      });
  }, []);

  const handleDisconnect = () => {
    dispatch(setProfil({}));
    dispatch(setCatalogue({}));
    dispatch(setRegister({}));
    localStorage.removeItem("token");

    //persist:root = is profile slice key
    navigate("/");
  };
  return (
    <>
      {loading ? (
        <PageLoading />
      ) : (
        <div style={{ background: "#FAFBFF", zIndex: "-3" }}>
          <div className="background"></div>
          <section className="company-steps-icons container position-relative">
            <div className="row">
              <div className="col-2">
                <div className="d-flex " onClick={() => handleDisconnect()}>
                  <img
                    src="/imgs/logout.png"
                    alt=""
                    style={{ marginRight: "10px" }}
                  />
                  <p className="lg-out" style={{ fontSize: "14px" }}>
                    Déconnexion
                  </p>
                </div>
              </div>
            </div>
            <div className="row mt-4 ">
              <div className=" wrapper col-12 col-md-3 offset-md-5">
                <p style={{ fontSize: "16px" }} className="activite ">
                  Création de votre Profil
                </p>
              </div>
            </div>

            <div className="steps-icons">
              <div className={pageStage === 1 ? `step step-active` : `step`}>
                <p
                  className=" d-flex justify-content-center align-items-center step-icon"
                  onClick={() => dispatch(setFormStage(1))}
                >
                  <img src="/imgs/search1.png" alt="" />
                </p>
                <p className="title">Identité</p>
              </div>
              <p className="line"></p>
              <div className={pageStage === 2 ? `step step-active` : `step`}>
                <p
                  className=" d-flex justify-content-center align-items-center step-icon"
                  onClick={() => handleNextForm(2)}
                >
                  <img src="/imgs/marque.png" alt="" />
                </p>
                <p className="title">Image de marque</p>
              </div>

              <div className={pageStage === 3 ? `step step-active` : `step`}>
                <p
                  className=" d-flex justify-content-center align-items-center step-icon"
                  onClick={() => handleNextForm(3)}
                >
                  <img src="/imgs/catalogue.png" alt="" />
                </p>
                <p className="title">E-Catalogue</p>
              </div>

              <div className={pageStage === 5 ? `step step-active` : `step`}>
                <p
                  className=" d-flex justify-content-center align-items-center step-icon"
                  onClick={() => handleNextForm(5)}
                >
                  <img src="/imgs/target.png" alt="" />
                </p>
                <p className="title">Cible</p>
              </div>
            </div>
          </section>

          {/* ---  Profil Creation Steps---- */}
          <div className="">
            {
              {
                1: <Identite />,
                2: <Marque />,
                3: <Catalogue />,
                5: <Cible />,
                4: <Article />,
              }[pageStage]
            }
          </div>
          <ToastContainer limit={1} />
        </div>
      )}
    </>
  );
}

export default CompanySetting;
