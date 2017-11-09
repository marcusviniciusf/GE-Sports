import axios from 'axios';
import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Home extends Component {
  state = { refresh: false };

  componentWillMount() {
    this.props.fetchJogos();
  }

  _onRefresh() {
    this.setState({ refresh: false });
    // this.props.fetchJogos();
  }

  renderRow({ item }) {
    // console.log('RenderRow', item);
    return (
      <View>
        <Text>teste</Text>
      </View>
    );
  }

  renderHeader(jogos) {
    return <Text>{jogos.data_hoje}</Text>
  }

  render() {
    const { jogos } = this.props;
    console.log(this.state);
    return(
      // <ScrollView style={{ flex: 1 }}>
        // <Text>{jogos.data_hoje}</Text>
        <FlatList 
          data={jogos.jogos}
          ListHeaderComponent={this.renderHeader(jogos)}
          renderItem={this.renderRow}
          keyExtractor={i => i.id}
          refreshing={this.state.refresh}
          onRefresh={() => this._onRefresh}
        />
      // </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  // console.log('mapStateTopProps', state);
  const { jogos } = state.jogosReducer;
  return { 
    jogos 
  };
}

export default connect(mapStateToProps, actions)(Home);
