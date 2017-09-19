import React, { Component } from 'react';
import BABYLON from 'babylonjs';
import { rgbToHex } from '../utils';
import '../styles/Tomato.scss';

class Tomato extends Component {
  constructor(props) {
    super(props);

    this.state = {
      h_timer: null,
      scene: null
    }

  }

  componentDidMount() {
    this.createTomatoCanvas();

    if (this.props.started) {
      this.startTimer();
    }
  }

  createTomatoCanvas() {
    var canvas = document.getElementById('canvas-tomato');
    var engine = new BABYLON.Engine(canvas, true);

    var createScene = function () {
      function v3d(...args) {
        return new BABYLON.Vector3(...args);
      };

      function createTail() {
        var tailMaterial = new BABYLON.StandardMaterial("texture3", scene);
        tailMaterial.diffuseColor = new BABYLON.Color3(0.32, 0.46, 0.29);

        var tail = BABYLON.Mesh.CreateBox("tail", 0.4, scene);
        tail.position.y = 2.25;

        var tail2 = BABYLON.Mesh.CreateBox("tail2", 0.3, scene);
        tail2.position.y = 2.50;
        tail2.material = tailMaterial;

        var tail3 = BABYLON.MeshBuilder.CreateBox("tail3", {
          size: 0.4,
          width: 1,
          height: 0.1,
          depth: 1
        })
        tail3.material = tailMaterial;
        tail3.position.y = 2;

        tail.addChild(tail3);
        tail.addChild(tail2);

        tail.material = tailMaterial;

        return tail;
      }

      function createLeftSideTimer() {
        const box = BABYLON.MeshBuilder.CreateBox("box", {
          size: 0.4,
          width: 1,
          height: 1.9,
          depth: 1.9
        })
        box.position.x = 0.5002;
        box.position.y = 1;
        box.position.z = 0;

        box.rotation.x = Math.PI / 2;

        var boxMaterial = new BABYLON.StandardMaterial("texture3", scene);
        boxMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);

        box.material = boxMaterial;
        return box;
      }

      function createRightSideTimer() {
        var box2 = BABYLON.MeshBuilder.CreateBox("box2", {
          size: 0.4,
          width: 1.9,
          height: 1.9,
          depth: 1
        });
        box2.position.x = 0;
        box2.position.y = 1;
        box2.position.z = 0.5002;

        box2.rotation.z = Math.PI;

        var boxMaterial2 = new BABYLON.StandardMaterial("texture4", scene);
        boxMaterial2.diffuseColor = new BABYLON.Color3(1, 1, 1);

        box2.material = boxMaterial2;

        return box2;
      }

      var scene = new BABYLON.Scene(engine);
      scene.clearColor = new BABYLON.Color3(0.36, 0.75, 0.92);

      var camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 2, v3d(3, 1, 3), scene);
      camera.setTarget(v3d(0, 1, 0));

      var light2 = new BABYLON.SpotLight("spot02", v3d(30, 40, 40), v3d(-1, -1, -1), 1.1, 16, scene);
      light2.intensity = 1;

      var light = new BABYLON.DirectionalLight("dir01", v3d(-1, -2, -1), scene);
      light.position = v3d(20, 40, 20);
      light.intensity = 0.4;

      var light3 = new BABYLON.PointLight("light1", v3d(3, 5, 3), scene);
      light3.intensity = 0.1;


      var tomatoMaterial = new BABYLON.StandardMaterial("tomatoMaterial", scene);
      tomatoMaterial.diffuseColor = new BABYLON.Color3(0.56, 0.70, 0.31);

      var tomato = BABYLON.Mesh.CreateBox("tomato", 2, scene);
      tomato.position.y = 1;
      tomato.material = tomatoMaterial;


      const tail = createTail();
      const leftSide = createLeftSideTimer();
      const rightSide = createRightSideTimer();

      tomato.addChild(tail);
      tomato.addChild(leftSide);
      tomato.addChild(rightSide);


      var leftSideTimer = new BABYLON.DynamicTexture("leftSideTimer", 256, scene, true);
      leftSide.material.diffuseTexture = leftSideTimer;
      leftSide.material.backFaceCulling = false;

      var rightSideTimer = new BABYLON.DynamicTexture("rightSideTimer", 256, scene, true);
      rightSide.material.diffuseTexture = rightSideTimer;
      rightSide.material.backFaceCulling = false;

      return {
        scene,
        tomatoMaterial,
        leftSideTimer,
        rightSideTimer
      }
    }

    this.setState({
      ...this.state,
      ...createScene()
    });

    engine.runRenderLoop(this.animate.bind(this));
  }

  animate = () => {
    const { time, color } = this.props;
    const {
      scene,
      tomatoMaterial,
      leftSideTimer,
      rightSideTimer
    } = this.state;

    const min = ~~(time / 60);
    const sec = time % 60;
    const hexColor = rgbToHex(...color);

    tomatoMaterial.diffuseColor = new BABYLON.Color3(...color);
    leftSideTimer.drawText(`${min < 10 ? '0' + min : min}`, 15, 198, "bold 200px Arial", "white", hexColor, true);
    rightSideTimer.drawText(`${sec < 10 ? '0' + sec : sec}`, 20, 200, "bold 200px Arial", "white", hexColor, true);

    scene.render();
  }

  startTimer = () => {
    this.setState({
      h_timer: setInterval(this.props.updateTomato, 1000)
    });
  }

  stopTimer = () => {
    clearInterval(this.state.h_timer);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.started && !this.props.started) {
      this.startTimer();
    } else if (!newProps.started && this.props.started) {
      this.stopTimer();
    }
  }

  render() {
    return (
      <div className="tomato">
        <canvas width="1024px" height="1024px" id="canvas-tomato"></canvas>
      </div>
    )
  }
}

export default Tomato;