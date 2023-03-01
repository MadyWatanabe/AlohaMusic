import React, { Component, useState } from 'react';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import {StyleSheet, Text, TouchableOpacity, View, Image, StatusBar} from 'react-native';


export default class App extends Component {

  state = {
    isPlaying: false,// is the music currently playing: no
    playbackInstance: null,// keeps track of the play / pause feature
  }

  async componentDidMount() {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playThroughEarpieceAndroid: true,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
    });
    this.loadAudio();
  }

  async loadAudio() {
    const playbackInstance = new Audio.Sound();
    const source = require('./music/ukulele.mp3'); // this is used on line 38
		const status = {
			shouldPlay: this.state.isPlaying,
			volume: this.state.volume,
    };
    playbackInstance
      .setOnPlaybackStatusUpdate(
        this.onPlaybackStatusUpdate
      );
      // the source on line 38 will play what is specified on line 28, in this case the ukulele.mp3 in the music folder
    await playbackInstance.loadAsync(source, status, false);
    this.setState({
      playbackInstance
    });
  }

// checks the value of this.state.isPlaying to determine weather the track should be played or paused 
handlePlayPause = async () => {
  const { isPlaying, playbackInstance } = this.state;
  isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync();
  this.setState({
    isPlaying: !isPlaying
  });
}


render(){
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Aloha Music</Text>
      <Image style={styles.image}source={require('./assets/ukulele.png')} />

      <TouchableOpacity onPress={this.handlePlayPause}>
      
        {this.state.isPlaying ?
        <Feather name ="pause" size={32} /> :
        <Feather name='play' size={32}  />
        }
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}
}
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4e3cf',
    alignItems: 'center',
    justifyContent: 'center',
    
    
  },

  image:{
    height:500,
    width:300,
    marginBottom: 35,
  },

  heading:{
    width: 300,
    backgroundColor:'#da9547',
    textAlign:'center',
    alignItems:'center',
    marginBottom:35,
    fontSize:30,
    fontWeight:'bold',
 },

});
