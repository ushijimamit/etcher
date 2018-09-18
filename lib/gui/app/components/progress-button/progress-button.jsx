/*
 * Copyright 2016 resin.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const React = require('react')
const ReactDOM = require('react-dom')
const propTypes = require('prop-types')
const Color = require('color')

const { default: styled, keyframes } = require('styled-components');

const { Button, ProgressBar, Provider } = require('rendition')

const { colors, consts } = require('./../../theme')
const { StepButton, StepSelection } = require('./../../styled-components')

const progressButtonStripesBackgroundColor = '#' + Color(colors.primary.background).desaturate(0.05).rgbNumber().toString(16)
const progressButtonStripesForegroundColor = '#' + Color(colors.primary.background).darken(0.18).desaturate(0.2).rgbNumber().toString(16)

const ProgressButtonStripes = keyframes `
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 20px 20px;
  }
`

const FlashProgressBar = styled(ProgressBar)`
  > div {
    color: white !important;
    text-shadow: none !important;
  }

  width: 100%;
  max-width: ${consts.btnMaxWidth};
  margin: auto;

  background: ${Color(colors.warning.background).darken(0.18).string()};
`

const FlashProgressBarValidating = styled(FlashProgressBar) `

  // Notice that we add 0.01 to certain gradient stop positions.
  // That workarounds a Chrome rendering issue where diagonal
  // lines look spiky.
  // See https://github.com/resin-io/etcher/issues/472

  background-image: -webkit-gradient(linear, 0 0, 100% 100%,
    color-stop(0.25, ${progressButtonStripesForegroundColor}),
    color-stop(0.26, ${progressButtonStripesBackgroundColor}),
    color-stop(0.50, ${progressButtonStripesBackgroundColor}),
    color-stop(0.51, ${progressButtonStripesForegroundColor}),
    color-stop(0.75, ${progressButtonStripesForegroundColor}),
    color-stop(0.76 , ${progressButtonStripesBackgroundColor}),
    to(${progressButtonStripesBackgroundColor}));

  background-color: white;

  animation: ${ProgressButtonStripes} 1s linear infinite;
  overflow: hidden;

  background-size: 20px 20px;
`

class ProgressButton extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      disabled: false,
      striped: false
    }
  }

  static getDerivedStateFromProps (props, state) {
    state.disabled = props.shouldFlashStepBeDisabled || props.getLastFlashErrorCode
    state.striped = props.striped == 'check'
    return state
  }

  handleClick = () => {
    this.setState({ openBar: true })
    this.props.flash(this.props.image(),this.props.device())
  }

  render () {
    if (this.props.active) {
      if (this.state.striped){
        return (
          <Provider>
            <StepSelection>
              <FlashProgressBarValidating
                primary
                emphasized
                value={this.props.percentage}
              >
                {this.props.label}
              </FlashProgressBarValidating>
            </StepSelection>
          </Provider>
        )
      }
      else {
        return (
          <Provider>
            <StepSelection>
              <FlashProgressBar
                warning
                emphasized
                value={this.props.percentage}
              >
                {this.props.label}
              </FlashProgressBar>
            </StepSelection>
          </Provider>
        )
      }
    }
    else {
      return (
        <Provider>
          <StepSelection>
            <StepButton
              primary
              onClick={this.handleClick}
              disabled={this.state.disabled}
            >
              {this.props.label}
            </StepButton>
          </StepSelection>
        </Provider>
      )
    }
  }
}

ProgressButton.propTypes = {
  striped: propTypes.string,
  active: propTypes.bool,
  percentage: propTypes.number,
  label: propTypes.string,
  shouldFlashStepBeDisabled: propTypes.bool,
  getLastFlashErrorCode: propTypes.bool,
  flash: propTypes.func,
  image: propTypes.func,
  device: propTypes.func,
}

module.exports = ProgressButton
