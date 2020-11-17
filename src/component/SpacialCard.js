import React, { Component } from "react";
import { Text, View, Dimensions, StyleSheet, Image } from "react-native";

import Carousel from "react-native-snap-carousel"; // Version can be specified in package.json

import { scrollInterpolator, animatedStyles } from "./utils/animations";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.4);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 3);

const DATA = [];
for (let i = 0; i < 5; i++) {
  DATA.push(i);
}

export default class SpacialCard extends Component {
  state = {
    index: 0,
  };

  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
  }

  _renderItem({ item }) {
    return (
      <View style={styles.itemContainer}>
        <Image
          style={{ width: "90%", height: "90%" }}
          source={{
            uri:
              "data:image/jpeg;base64,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",
          }}
        />
      </View>
    );
  }

  render() {
    return (
      <View>
        <Carousel
          ref={(c) => (this.carousel = c)}
          data={DATA}
          renderItem={this._renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          containerCustomStyle={styles.carouselContainer}
          inactiveSlideShift={0}
          onSnapToItem={(index) => this.setState({ index })}
          scrollInterpolator={scrollInterpolator}
          slideInterpolatedStyle={animatedStyles}
          useScrollView={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 20,
  },
  itemContainer: {
    width: ITEM_WIDTH - 10,
    height: ITEM_HEIGHT + 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#FFF",
  },
  itemLabel: {
    color: "white",
    fontSize: 24,
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});
