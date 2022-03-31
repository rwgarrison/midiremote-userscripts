//-----------------------------------------------------------------------------
// 0. INCLUDE common functions
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
// 1. DRIVER SETUP - create driver object, midi ports and detection information
//-----------------------------------------------------------------------------

var midiremote_api = require('midiremote_api_v1')
var axiomBasis = require('../axiom_common')
const sysex = require('../axiom-sysex')
const sysexObject = sysex.obj
const group = sysex.obj["groups"]
const group_name = group[0].name
console.log(group_name);

var deviceDriver = midiremote_api.makeDeviceDriver('m-Audio', 'axiom-61', 'Ron Garrison')

var midiInput = deviceDriver.mPorts.makeMidiInput()
var midiOutput = deviceDriver.mPorts.makeMidiOutput()

// Program bank 0 of Axiom
axiomBasis.makeActivationHandling(deviceDriver, sysexObject, midiOutput)

deviceDriver.makeDetectionUnit().detectPortPair(midiInput, midiOutput)
    .expectInputNameEquals('USB Axiom 61')
    .expectOutputNameEquals('USB Axiom 61')
    .expectSysexIdentityResponse('002008', '630E', '1A03') // Axiom-61
   
var surface = deviceDriver.mSurface

//-----------------------------------------------------------------------------
// 2. SURFACE LAYOUT - create control elements and midi bindings
//-----------------------------------------------------------------------------

// Get CC Mapping from sysex object sent to Axiom
// function getSurfaceCC(sysexObject) {
// 
//   function getElementInfo (element) {
// 
//     var midiType
//     var midiValue
// 
//     if (element.cc < 132) {
//       midiValue = element.cc
//       midiType = "cc"
//     } else {
//         switch (element.type) {
//           case "knob":
//             switch (element.midicc) {
//               case 132:
//                 // RPN Coarse
//               case 133:
//               case 134:
//               case 135:
//               
//             }
//             break
//           
//           case "fader":
//             break
//     
//           case "zone":
//             break
//     
//           case "pad":
//             break
//           
//           case "transport":
//             break
//     
//           case "button":
//             break
//         }
//       }
//     return [midiType, midiValue]
//   }
// 
//   const groups         = sysexObject.groups
//   const numberOfGroups = groups.length
// 
//   const transportCC = []
// 
// for (var g = 0; g < 1; g++) {
//   var group    = groups[g]
//   var elements = group.elements
//   var numElements = elements.length
//   for (var i = 0; i < numElements; i++) {
//     var element = elements[i]
//     // determine midi type and value of a button
//     var cc
//     if (element.cc < 128) {
//       cc = element.cc
//     } else if (element.cc ==  ) {
//       
//     }
//     if (element.type == "transport") {
//       switch (element.name) {
//         case "LOOP" {
//           transportCC[element.instance]
//           break
//         }
//       }
//     }
//     
//   }  
// }
// }

function makeSurfaceElements() {
  var surfaceElements = {}

  const ccFaderValues = [0x4A, 0x47, 0x5B, 0x5D, 0x49, 0x48, 0x05, 0x54, 0x07]
  const ccKnobValues = [0x0A, 0x02, 0x0C, 0x0D, 0x4B, 0x4C, 0x5C, 0x5F]
  const ccTransportValues = [0x14, 0x15, 0x16, 0x17, 0x18, 0x19]
  const ccButtonValues = [0x20, 0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28]

  axiomBasis.makeFaders (surface, 0.25, 0.25, 2, 5, ccFaderValues, midiInput, midiOutput, surfaceElements)
  axiomBasis.makeButtons (surface, 0.25, 5.75, 2, 2,  ccButtonValues, midiInput, midiOutput, surfaceElements)
  axiomBasis.makeKnobs (surface, 22.25, 0.5, 2, 2, ccKnobValues, midiInput, midiOutput, surfaceElements)
  axiomBasis.makeTransport (surface, 23.0, 5.5, 1.5, 1.5, ccTransportValues, midiInput, midiOutput, surfaceElements)
  //axiomBasis.makePads (surface, 37.0, 0.25, midiInput, midiOutput, surfaceElements)
  //axiomBasis.makePads (surface, 37.0, 3.75, midiInput, midiOutput, surfaceElements)

  surfaceElements.pianoKeys = surface.makePianoKeys(0, 9, 50, 6, 0, 60)

  return surfaceElements
}

var surfaceElements = makeSurfaceElements()

//-----------------------------------------------------------------------------
// 3. HOST MAPPING - create mapping pages and host bindings
//-----------------------------------------------------------------------------
axiomBasis.makeHostMapping(midiremote_api.mDefaults, deviceDriver, surfaceElements, surface, midiOutput)

