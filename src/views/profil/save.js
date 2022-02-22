import React from 'react';

function Save(props) {
  return (
    <div
      className="container mt-5"
    >
      <img src="/imgs/logo.png" alt="logo" width={100}/>
      <div className="row">
        <div className="col-8 offset-2">
          <h5 className="text-secondary">Félicitation! vous avez complété votre profil avec succès !</h5>
          <p>Le document ci-après nous permet de vérifier l’identité de votre entreprise et garantir votre sécurité. Vous pourrez alors accéder à un réseau de confiance et de fiabilité !</p>
          <p className="my-4 text-primary">Votre demande de vérification de votre compte à Marketface est gratuite.</p>
          <img src="/imgs/stepper.png" alt="" height={140}/>
          <div className="border border-success w-50 py-3 mx-auto mt-5 d-flex justify-content-center gap-5" style={{'borderRadius': '14px'}}>
            <img src="/imgs/clip.png" width={30}/>

            <p className="text-primary">Joindre votre demande</p>
          </div>
          <div className="row">
            <div className="col-6 offset-3">
              <div className="d-flex justify-content-center gap-5 my-5">
                <button className="btn btn-success text-white rounded-pill px-5">Envoyer</button>
                <button className="btn btn-outline-success rounded-pill px-5">Suivant</button>
              </div>
            </div>
            <div className="col-3 d-flex justify-content-end align-items-baseline">
              <img src="/imgs/logo-lg.png" alt="logo" width={160} />
            </div>
          </div>
          <small>*La signature numérique est autorisée</small>
        </div>
      </div>
    </div>
  );
}

export default Save;