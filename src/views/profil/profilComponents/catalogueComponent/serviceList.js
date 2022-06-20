import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedArticle } from "../../../../store/ArticleSlice";

export default function ServiceList({ setAction }) {
  const [articleService, setArticleService] = useState([]);

  const articles = useSelector((state) => state.profile.articles);
  const dispatch = useDispatch();
  const styleText = {
    border: "none",
    backgroundColor: "white",
    resize: "none",
    textTransform: "none",
  };
  const ModifyArticle = (article) => {
    console.log("article", article);
    dispatch(setSelectedArticle(article));
    console.log("article updated  succesfully");
    setAction(1);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    const articleServ = articles.filter(
      (article) => article.type_article == "service"
    );

    const sortedArticles = articleServ
      .slice()
      .sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at));

    setArticleService(sortedArticles);
  }, [articles]);
  return (
    <form
      className="container"
      name="form-identite"
      id="form-identite-gen"
      style={{ padding: "14px 30px" }}
    >
      {/* <div className="page_number">1/2</div> */}

      <div className="form-identite-info d-block mt-3">
        <div
          className="articles row d-flex justify-content-around mb-4"
          style={{ marginTop: "20px" }}
        >
          {articleService && articleService.length
            ? articleService.map((article) => {
                return (
                  <div className="col-md-6 ">
                    <div className="card-article mb-4 position-relative">
                      <div className="ln-crd "></div>
                      {article.images && article.images.length ? (
                        <figure>
                          <img
                            className="card-img"
                            src={`${process.env.REACT_APP_HOST_URL}/${article?.images[0].path}`}
                            alt="article produit"
                          />
                        </figure>
                      ) : (
                        ""
                      )}
                      <div className="items1 d-flex">
                        <div className="d-flex me-auto mt-2">
                          <p className=" type-article me-2">Nom de l'offre</p>
                        </div>
                      </div>
                      <div className="d-flex" style={{ margin: "30px 16px" }}>
                        <div className="me-auto prx">Prix</div>
                        <div className="price">{`${article.prix} MDH`}</div>
                      </div>
                      <div className="d-flex" style={{ margin: "30px 16px" }}>
                        <div className="me-auto prx">Author</div>
                        <div className="d-flex justify-content-around mt-2">
                          <img
                            src="/imgs/author.png"
                            className="auth-img me-2"
                            alt=""
                          />
                          <p className="auth-nm">Jamal Y</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
        <div className="buttons d-flex justify-content-end">
          <div
            className=" d-flex justify-content-center  sv-btn col-12 col-md-5 "
            onClick={() => setAction(2)}
          >
            <p style={{ fontSize: "16px" }} className="suivant-iden">
              Ajouter un service
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
