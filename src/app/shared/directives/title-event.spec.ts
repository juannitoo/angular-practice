describe('Est-ce que les tests fonctionnent sans rien installer malgré --skip-tests ?', function() {
  it('doit afficher un test dans mon navigateur et ds la console !', function() {

    function maFonction(){
      return true
    }
    // Code de test ici
    expect(maFonction()).toEqual(true); 
  });
});