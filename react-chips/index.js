/**
 * @author Ramprasath R <ramprasath25@gmail.com>
 * @author bojko108 <bojko108@gmail.com>
 */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import Chips from './chips';

class ReactChipsInput extends React.Component {
  constructor(props) {
    super(props);
    let initialChips = props.initialChips.map(c => {
      return {
        text: c.text ? c.text : c,
        finished: c.finished !== undefined ? c.finished : false
      };
    });
    this.state = {
      isFocused: false,
      chips: initialChips,
      inputText: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      chips: nextProps.initialChips ? nextProps.initialChips : []
    });
  }

  handleFocus = () => {
    this.setState({ isFocused: true });
  };

  handleChangeText = text => {
    this.setState({ inputText: text });
  };

  handleChipClick = index => {
    const newArray = [...this.state.chips];
    if (newArray[index].finished) {
      newArray.splice(index, 1);
    } else {
      newArray[index].finished = true;
    }
    this.setState(
      {
        chips: newArray
      },
      () => this.props.onChangeChips && this.props.onChangeChips(this.state.chips)
    );
  };

  handleBlur = () => {
    if (this.state.inputText !== '' && this.state.chips.findIndex(c => c.text === this.state.inputText) === -1) {
      this.setState(
        {
          chips: [...this.state.chips, { text: this.state.inputText, finished: false }],
          inputText: '',
          isFocused: false
        },
        () => this.props.onChangeChips && this.props.onChangeChips(this.state.chips)
      );
    } else {
      this.setState(
        {
          inputText: '',
          isFocused: false
        },
        () => this.props.onChangeChips && this.props.onChangeChips(this.state.chips)
      );
    }
  };

  render() {
    const { label, theme, blurOnSubmit, labelStyle, chipStyle, chipsStyle } = this.props;

    const { inputText } = this.state;

    const chips = this.state.chips.map((item, index) => (
      <Chips key={index} chip={item} chipStyle={chipStyle} onPress={() => this.handleChipClick(index)} />
    ));

    return (
      <View>
        <View>
          <TextInput
            label={label}
            theme={theme}
            style={labelStyle}
            onFocus={this.handleFocus}
            onSubmitEditing={this.handleBlur}
            onChangeText={text => this.handleChangeText(text)}
            blurOnSubmit={blurOnSubmit}
            value={inputText}
          />
        </View>
        <View style={chipsStyle}>{chips}</View>
      </View>
    );
  }
}

ReactChipsInput.defaultProps = {
  label: 'Enter your text',
  theme: {},
  blurOnSubmit: false,
  labelStyle: {},
  initialChips: [],
  onChangeChips: null,
  chipStyle: {},
  chipsStyle: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }
};

ReactChipsInput.propTypes = {
  label: PropTypes.string,
  theme: PropTypes.object,
  blurOnSubmit: PropTypes.bool,
  initialChips: PropTypes.array,
  onChangeChips: PropTypes.func,
  labelStyle: PropTypes.object,
  chipStyle: PropTypes.object,
  chipsStyle: PropTypes.object
};

export default ReactChipsInput;
