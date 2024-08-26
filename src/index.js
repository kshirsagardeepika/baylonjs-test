


// var createScene = async function () {
//   console.log('insode')
//   const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
//   const engine = new BABYLON.Engine(canvas, true);
//   var scene = new BABYLON.Scene(engine);

//   var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
//   camera.setTarget(BABYLON.Vector3.Zero());
//   camera.attachControl(canvas, true);

//   var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
//   light.intensity = 0.7;




//   var loader = new BABYLON.AssetsManager(scene);

//   var position = -5;
//   var pos = function(t: any) {
//       t.loadedMeshes.forEach(function(m: any) {
//           m.position.x -= position;
//       });
//       position += 5;
//   };
  
//    BABYLON.SceneLoader.Append("https://s3.eu-west-1.amazonaws.com/exclusive.aerariumchain.io/tests/", "samsung-controller.glb", scene)
  
//   loader.onFinish = function() {
//       engine.runRenderLoop(function () {
//           scene.render();
//       });
//   };

//   loader.load();






//   // var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
//   // sphere.position.y = 1;
//   // var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);

//   // const groundMat = new BABYLON.StandardMaterial("groundMat");
//   // groundMat.diffuseColor = BABYLON.Color3.Red();
//   // ground.material = groundMat;

//   // const roofMat = new BABYLON.StandardMaterial("roofMat");
//   // roofMat.diffuseTexture = new BABYLON.Texture("assets/colonna-2_1.jpg", scene);
//   // sphere.material = roofMat;

//   // BABYLON.SceneLoader.Append("https://s3.eu-west-1.amazonaws.com/exclusive.aerariumchain.io/tests/", "samsung-controller.glb", scene)
    
//   BABYLON.SceneLoader.Load("https://s3.eu-west-1.amazonaws.com/exclusive.aerariumchain.io/tests/", "samsung-controller.glb", engine)
//   // BABYLON.SceneLoader.Load("assets/", "samsung-controller.glb", engine)

//   // BABYLON.SceneLoader.Append("assets/scifi_girl_v.01/", "scifi-scene.gltf", scene)

//   // BABYLON.SceneLoader.ImportMesh(
//   //   undefined,"assets/", "samsung-controller.glb", scene, null, undefined, null, '.glb');


//     // BABYLON.SceneLoader.LoadAssetContainer("assets/scifi_girl_v.01/", "scifi-scene.gltf", scene, function (container) {
//     //   // const meshes = container.meshes;
//     //   const materials = container.materials;
//     //   //...
    
//     //   // Adds all elements to the scene
//     //   container.addAllToScene();
//     // });

    
//     // Result has meshes, particleSystems, skeletons, animationGroups and transformNodes
//     var camera1 = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, BABYLON.Vector3.Zero(), scene);
//     camera1.attachControl(canvas, false);
//     // camera1.target = result.meshes[0];

//    var light1 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(20, 20, 100), scene);
//     // Move the light with the camera
//     scene.registerBeforeRender(function () {
//         light1.position = camera.position;
//     });


//   engine.runRenderLoop(() => {
//     scene.render();
//   });

//   // Resize the engine on window resize
//   window.addEventListener('resize', () => {
//     engine.resize();
//   });


//   return scene;
// };


import { Engine, Scene, ArcRotateCamera, FreeCamera, HemisphericLight, Vector3, SceneLoader, AssetsManager, Tools, Texture, WebXRExperienceHelper, WebXRSessionManager, Color3} from 'babylonjs';
import {OBJFileLoader, GLTFFileLoader} from '@babylonjs/loaders';
import { WebXRDefaultExperience } from "@babylonjs/core/XR/webXRDefaultExperience.js";
import {Inspector} from '@babylonjs/inspector';
import '@babylonjs/core';


SceneLoader.RegisterPlugin(new OBJFileLoader());

var createScene = async function () {
  const canvas = document.getElementById('renderCanvas'); // as HTMLCanvasElement;
  const engine = new Engine(canvas, true);
  var scene = new Scene(engine);

    new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
    // var cam =  new ArcRotateCamera("ArcRotateCamera", 0.5, 1, 0.5, new BABYLON.Vector3(0, 3, 0), scene);
    // cam.attachControl(canvas);

    // cam.setTarget(BABYLON.Vector3.Zero());

    // ----------working---------
    // let c = SceneLoader.Append("/assets/LibertyStatue/", "LibertStatue.obj", scene);



    // let mesh = SceneLoader.ImportMesh("Liberty", "/assets/LibertyStatue/", "LibertStatue.obj", scene, function (meshes) {
    //     MTLFileLoader.ParseMTL(scene, "/assets/LibertStatue.mtl", function (materials) {
    //         materials.forEach(function (material) {
    //             // Apply each material to the corresponding mesh
    //             meshes.forEach(function (mesh) {
    //                 if (mesh.name === material.name) {
    //                     mesh.material = material;
    //                 }
    //             });
    //         });
    //     });
    // });

    const camera = new ArcRotateCamera("camera1", 
        Tools.ToRadians(45), // alpha (rotation around Y axis)
        Tools.ToRadians(45), // beta (rotation around X axis)
        10, // radius (distance from the target)
        new Vector3(0, 0, 0), // target (center of object)
        scene);
    
    // Attach the camera to the canvas so it responds to user input
    camera.attachControl(canvas, true);
    camera.lowerRadiusLimit = 2;
    camera.upperRadiusLimit = 20;

    // Enable panning
    camera.panningSensibility = 1000;

    // Allow zooming and rotating with mouse
    camera.wheelPrecision = 50;

    console.log('XR', await WebXRSessionManager.IsSessionSupportedAsync("immersive-vr"));


    let obj = SceneLoader.ImportMesh("", "/assets/LibertyStatue/", "LibertStatue.obj", scene, function (meshes) {
        // Success callback
        meshes.forEach(function(mesh) {
            console.log(mesh.name + " loaded with material: " + mesh.material.name);
        });
    }, null, function(scene, message, exception) {
        // Error callback
        console.error("An error occurred while loading the model:", message, exception);
    });


    const env = scene.createDefaultEnvironment({
        enableGroundShadow: true,
        groundYBias: 2.8,
    });
    env.setMainColor(Color3.FromHexString("#74b9ff"));
    // here we add XR support
    // const xr = await scene.createDefaultXRExperienceAsync({
    //     floorMeshes: [env.ground],
    // });

    // var vrHelper = scene.createDefaultXRExperienceAsync({
    //     createDeviceOrientationCamera: false,
    //     // useXR: true, // This will enable XR if supported
    //     floorMeshes: [env.ground],
    // });

    scene.createDefaultXRExperienceAsync().then(function (xrHelper) {
        console.log("WebXR experience initialized successfully.");
    }).catch(function (error) {
        console.error("Error initializing WebXR experience:", error);
    });
    
   
    scene.debugLayer.show({ embedMode: true }).then((layer) => {
        layer.select(scene);
    });
    // Inspector.Show(scene, {});

    // await testForARSupport(scene);
    engine.runRenderLoop(function () {
        scene.render();
    });

    window.addEventListener("resize", function() {
        engine.resize();
    });

    return scene;
};
createScene();



var testForARSupport = async function (s){
    return new Promise(async (resolve) => {
        var xrExp = await s.createDefaultXRExperienceAsync({
            uiOptions: {
                sessionMode: "immersive-vr",
                referenceSpaceType: "unbounded"
            }, 
            optionalFeatures:true
        })
        var isARMode = false;
        console.log(xrExp)
        if (xrExp.baseExperience){
            console.log("XR Support Detected");
        } else {
            console.log("No XR Support Detected");
        }
        resolve();
    });
}