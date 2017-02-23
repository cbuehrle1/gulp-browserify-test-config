if (window.NP === undefined) { window.NP = {}; }

(() => {

  class SecondComponent extends React.Component {

    render() {
      
      return <div>second component</div>
    }
  }

  NP.SecondComponent = SecondComponent;
})()
