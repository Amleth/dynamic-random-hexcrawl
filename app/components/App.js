import React from 'react';
import {Link} from 'react-router';

const App = ({children, exploreMap, resetMap}) => {
  let childComponentName;
  if (React.Children.count(children) != 1) throw new Error('WTF?');
  React.Children.forEach(children, _ => {
    childComponentName = _.type.displayName.match(/^Connect\((.*)\)$/)[1];
  });

  let nav;

  switch (childComponentName) {
    case 'Map':
      nav = <nav>
        <p>Pour explorer l'archipel, cliquez sur les hexagones accessibles (les hexagones gris contigus aux hexagones explorés).</p>
        <span className="actionLink" onClick={exploreMap}>⬣ Exploration automatique</span>
        <span className="actionLink" onClick={resetMap}>⬣ Reset</span>
        <Link to='p'>☸ Paramètres & légende</Link>
      </nav>;
      break;
    case 'Parameters':
      nav = <nav>
        <Link to='m'>⮌ Retour à la carte</Link>
      </nav>;
      break;
  }

  return <div>
    {nav}
    {children}
  </div>;
};

export default App;