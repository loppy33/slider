import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imgs: [],
      sliderClass: "slider",
      counter: 0,
    }
    this.timeClick = '';
    this.timeOutTime = 300;
  }

  componentDidMount() {
    this.setState(() => {
      let imgs = []
      for (let i = 0; i < 5; i++) {
        imgs.push(`images/${i}.png`)
      }
      return {
        imgs: imgs
      }
    })
  }

  handleSlider(toRight) {
    if (this.timeClick !== '') {
      this.timeClick = Date.now() - this.timeClick
    } 
    else {
      this.timeClick = Date.now()
    }
    console.log(this.timeClick)

    if (toRight) {
      this.setState(function (state) {
        return {
          sliderClass: "slider right",
          counter: state.counter + 1,
        }
      }, function () { console.log(this.state.counter) })
    }
    else {
      this.setState(function (state) {
        let counter = state.counter - 1
        if(counter < 0) {
          counter = state.imgs.length - 1;
        }
        return {
          sliderClass: "slider left",
          counter: counter,
        }
      }, function () { console.log(this.state.counter) })
    }
    setTimeout(() => {
      this.setState(function (state) {
        let newImages = [];
        for (let i = 0; i < state.imgs.length ; i++) {
          newImages.push(`images/${(i + Math.abs(state.counter)) % 5}.png`)
        }
        this.timeClick = '';
        return {
          sliderClass: "slider",
          imgs: newImages,
        }
      })
    }, this.timeOutTime)
  }


  render() {
    return (
      <div className="App" >
        <h1>Palm Angels</h1>
        <form action="">
          <div className="icons">
            {
              this.state.imgs.map((img, id) => (
                <img onClick={() => console.log(img)} src={img} alt="" key={id} />
              ))
            }
          </div>
          <div className="sliderContainer">
            <div className={this.state.sliderClass}>
              {
                this.state.imgs.map((img, id) => (
                  <img src={img} alt="" key={id} />
                ))
              }
            </div>
            <div className="sliderButtons">
              <a href="#/" className='leftSlider' onClick={() => this.handleSlider(false)}>
                left
              </a>
              <a href="#/" className='rightSlider' onClick={() => this.handleSlider(true)}>
                right
              </a>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default App;

// TODO повторение и стилин