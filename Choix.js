var Choix = (function() {
    let salaire = 1500
    let solde = 0 // taxes etc
    let norme = new Object(); // Limites ?
    norme.pollution = -1
    norme.dechets = -1
    norme.production = -1
    let avantages = 0
    let securite = new Object();
    securite.employes = 1 // 0.5 - 1.5
    securite.robots = 1 // 0.5 - 1.5

    return {
        Solde: function() {
            return solde;
        },
        Norme_pollution: function() {
            return norme.pollution;
        },
        Norme_dechets: function() {
            return norme.dechets;
        },
        Norme_production: function() {
            return norme.production;
        },
        Avantages: function() {
            return Math.log((salaire/300) - (17*avantages));
        },
        Salaire: function() {
            return salaire;
        },
        Securite_employes: function() {
            return securite.employes;
        },
        Securite_robot: function() {
            return securite.robots;
        },
    };

})();
