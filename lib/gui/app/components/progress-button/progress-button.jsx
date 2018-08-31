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

const styled = require('styled-components').default
const { Button, ProgressBar, Provider } = require('rendition')

const { colors, consts } = require('./../../theme')
const { StepButton } = require('./../../styled-components')

const FlashProgressBar = styled(ProgressBar).attrs({
  className: "flash-progress-bar"
})`
  > div {
    color: white !important;
    text-shadow: none !important;
  }

  width: 100%;
  max-width: $btn-min-width;
  margin: auto;

  background: ${Color(colors.warning.background).darken(0.05).string()};
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
            <ProgressBar className={"flash-progress-bar-validating"}
              primary
              emphasized
              value={this.props.percentage}
            >
              {this.props.label}
            </ProgressBar>
          </Provider>
        )
      }
      else {
        return (
          <Provider>
            <FlashProgressBar
              warning
              emphasized
              value={this.props.percentage}
            >
              {this.props.label}
            </FlashProgressBar>
          </Provider>
        )
      }
    }
    else {
      return (
        <Provider>
          <StepButton
            primary
            onClick={this.handleClick}
            disabled={this.state.disabled}
          >
            {this.props.label}
          </StepButton>
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
