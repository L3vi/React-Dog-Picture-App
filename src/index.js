import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';

class Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      breeds: [],
      breedPictureUrls: []
    }
  }

  componentDidMount() {
    axios.get("https://dog.ceo/api/breeds/list/all")
      .then(res => {
        console.log(res);
        const breedList = Object.keys(res.data.message);
        this.setState({ isLoaded: true, breeds: breedList });
      })
      .catch(err => this.setState({ error: err, isLoaded: true }));
  }

  render() {
    const { error, isLoaded, breeds } = this.state;
    if (error) {
      return <div>Error: error.message</div>;
    } else if (!isLoaded) {
      return <div>Loading. . .</div>;
    } else {
      const navBar = (<div className="navBar">{breeds.map(breed => {
        return (<button className="navButton" onClick={() => { this.getPictures(breed) }}>{breed}</button>);
      })}</div>);

      if (this.state.breedPictureUrls) {
        return <div className="page">
          <div>{navBar}</div>
          <div>{this.state.breedPictureUrls.map(breedPictureUrl => {
            return (<img src={breedPictureUrl} />);
          })}
          </div>
        </div>;
      } else {
        return navBar;
      }

    }
  }

  getPictures(breed) {
    axios.get(`https://dog.ceo/api/breed/${breed}/images/random/3`)
      .then(res => {
        console.log(res);
        this.setState({ breedPictureUrls: res.data.message });
      })
      .catch(err => this.setState({ error: err, isLoaded: true }));
  }
}

class SideBar extends React.Component {

}

class MainView extends React.Component {

}


ReactDOM.render(
  <Page />,
  document.getElementById('root')
);