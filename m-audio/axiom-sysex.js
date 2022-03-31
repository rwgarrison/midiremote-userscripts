const json = '{ \
  "bank": 1, \
  "groups": [  \
    { \
      "id": 0, \
      "name": "faders and knobs", \
      "channel_sysex": 2, \
      "midicc_sysex": 3, \
      "msb_sysex": 4, \
      "lsb_sysex": 5, \
      "elements": [ \
        { \
          "entry": 0, \
          "name": "B1", \
          "instance": 0, \
          "type": "knob", \
          "channel": 0, \
          "midicc": 147, \
          "msb": 127, \
          "lsb": 10 \
        }, \
        { \
          "entry": 1, \
          "name": "B2", \
          "instance": 1, \
          "type": "knob", \
          "channel": 0, \
          "midicc": 147, \
          "msb": 127, \
          "lsb": 2 \
        }, \
        { \
          "entry": 2, \
          "name": "B3", \
          "instance": 2, \
          "type": "knob", \
          "channel": 0, \
          "midicc": 147, \
          "msb": 127, \
          "lsb": 12 \
        }, \
        { \
          "entry": 3, \
          "name": "B4", \
          "instance": 3, \
          "type": "knob", \
          "channel": 0, \
          "midicc": 147, \
          "msb": 127, \
          "lsb": 13 \
        }, \
        { \
          "entry": 4, \
          "name": "B5", \
          "instance": 4, \
          "type": "knob", \
          "channel": 0, \
          "midicc": 147, \
          "msb": 127, \
          "lsb": 75 \
        }, \
        { \
          "entry": 5, \
          "name": "B6", \
          "instance": 5, \
          "type": "knob", \
          "channel": 0, \
          "midicc": 147, \
          "msb": 127, \
          "lsb": 76 \
        }, \
        { \
          "entry": 6, \
          "name": "B7", \
          "instance": 6, \
          "type": "knob", \
          "channel": 0, \
          "midicc": 147, \
          "msb": 127, \
          "lsb": 92 \
        }, \
        { \
          "entry": 7, \
          "name": "B8", \
          "instance": 7, \
          "type": "knob", \
          "channel": 0, \
          "midicc": 147, \
          "msb": 127, \
          "lsb": 95 \
        }, \
        { \
          "entry": 8, \
          "name": "D9", \
          "instance": 0, \
          "type": "fader", \
          "channel": 0, \
          "midicc": 74, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "entry": 9, \
          "name": "D10", \
          "instance": 1, \
          "type": "fader", \
          "channel": 0, \
          "midicc": 71, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "entry": 10, \
          "name": "D11", \
          "instance": 2, \
          "type": "fader", \
          "channel": 0, \
          "midicc": 91, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "entry": 11, \
          "name": "D12", \
          "instance": 3, \
          "type": "fader", \
          "channel": 0, \
          "midicc": 93, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "entry": 12, \
          "name": "D13", \
          "instance": 4, \
          "type": "fader", \
          "channel": 0, \
          "midicc": 73, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "entry": 13, \
          "name": "D14", \
          "instance": 5, \
          "type": "fader", \
          "channel": 0, \
          "midicc": 72, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "entry": 14, \
          "name": "D15", \
          "instance": 6, \
          "type": "fader", \
          "channel": 0, \
          "midicc": 5, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "entry": 15, \
          "name": "D16", \
          "instance": 7, \
          "type": "fader", \
          "channel": 0, \
          "midicc": 84, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "entry": 16, \
          "name": "D17", \
          "instance": 8, \
          "type": "fader", \
          "channel": 0, \
          "midicc": 7, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "entry": 17, \
          "name": "Z1 Pitch Bend", \
          "instance": 0, \
          "type": "zone", \
          "channel": 0, \
          "midicc": 144, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "entry": 18, \
          "name": "Z2 Pitch Bend", \
          "instance": 1, \
          "type": "zone", \
          "channel": 0, \
          "midicc": 144, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "entry": 19, \
          "name": "Z3 Pitch Bend", \
          "instance": 2, \
          "type": "zone", \
          "channel": 0, \
          "midicc": 144, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "entry": 20, \
          "name": "Z4 Pitch Bend", \
          "instance": 3, \
          "type": "zone", \
          "channel": 0, \
          "midicc": 144, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "entry": 21, \
          "name": "Z1 Modulation", \
          "instance": 0, \
          "type": "zone", \
          "channel": 0, \
          "midicc": 1, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "entry": 22, \
          "name": "Z2 Modulation", \
          "instance": 1, \
          "type": "zone", \
          "channel": 0, \
          "midicc": 1, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "entry": 23, \
          "name": "Z3 Modulation", \
          "instance": 2, \
          "type": "zone", \
          "channel": 0, \
          "midicc": 1, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "entry": 24, \
          "name": "Z4 Modulation", \
          "instance": 3, \
          "type": "zone", \
          "channel": 0, \
          "midicc": 1, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "entry": 25, \
          "name": "Z1 Channel Pressure", \
          "instance": 0, \
          "type": "zone", \
          "channel": 0, \
          "midicc": 131, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "entry": 26, \
          "name": "Z2 Channel Pressure", \
          "instance": 1, \
          "type": "zone", \
          "channel": 0, \
          "midicc": 131, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "entry": 27, \
          "name": "Z3 Channel Pressure", \
          "instance": 2, \
          "type": "zone", \
          "channel": 0, \
          "midicc": 131, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "entry": 28, \
          "name": "Z4 Channel Pressure", \
          "instance": 3, \
          "type": "zone", \
          "channel": 0, \
          "midicc": 131, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "entry": 29, \
          "name": "Z1 Expression", \
          "instance": 0, \
          "type": "zone", \
          "channel": 0, \
          "midicc": 11, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "entry": 30, \
          "name": "Z2 Expression", \
          "instance": 1, \
          "type": "zone", \
          "channel": 0, \
          "midicc": 11, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "entry": 31, \
          "name": "Z3 Expression", \
          "instance": 2, \
          "type": "zone", \
          "channel": 0, \
          "midicc": 11, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "entry": 32, \
          "name": "Z4 Expression", \
          "instance": 3, \
          "type": "zone", \
          "channel": 0, \
          "midicc": 11, \
          "msb": 127, \
          "lsb": 0 \
        } \
      ] \
    }, \
    { \
      "id": 1, \
      "name": "user assignable keys", \
      "channel_sysex": 6, \
      "midicc_sysex": 7, \
      "program_sysex": 8, \
      "msb_sysex": 9, \
      "lsb_sysex": 10, \
      "elements": [ \
        { \
          "name": "Z1 Sustain Pedal", \
          "entry": 0, \
          "instance": 0, \
          "type": "zone", \
          "channel": 0, \
          "midicc": 146, \
          "program": 64, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "name": "Z2 Sustain Pedal", \
          "entry": 1, \
          "instance": 1, \
          "type": "zone", \
          "channel": 0, \
          "midicc": 146, \
          "program": 64, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "name": "Z3 Sustain Pedal", \
          "entry": 2, \
          "instance": 2, \
          "type": "zone", \
          "channel": 0, \
          "midicc": 146, \
          "program": 64, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "name": "Z4 Sustain Pedal", \
          "entry": 3, \
          "instance": 3, \
          "type": "zone", \
          "channel": 0, \
          "midicc": 146, \
          "program": 64, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "name": "Pad 1", \
          "entry": 4, \
          "instance": 0, \
          "type": "pad", \
          "channel": 0, \
          "midicc": 147, \
          "program": 36, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "name": "Pad 2", \
          "entry": 5, \
          "instance": 1, \
          "type": "pad", \
          "channel": 0, \
          "midicc": 147, \
          "program": 38, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "name": "Pad 3", \
          "entry": 6, \
          "instance": 2, \
          "type": "pad", \
          "channel": 0, \
          "midicc": 147, \
          "program": 46, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "name": "Pad 4", \
          "entry": 7, \
          "instance": 3, \
          "type": "pad", \
          "channel": 0, \
          "midicc": 147, \
          "program": 42, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "name": "Pad 5", \
          "entry": 8, \
          "instance": 4, \
          "type": "pad", \
          "channel": 0, \
          "midicc": 147, \
          "program": 50, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "name": "Pad 6", \
          "entry": 9, \
          "instance": 5, \
          "type": "pad", \
          "channel": 0, \
          "midicc": 147, \
          "program": 45, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "name": "Pad 7", \
          "entry": 10, \
          "instance":6 , \
          "type": "pad", \
          "channel": 0, \
          "midicc": 147, \
          "program": 51, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "name": "Pad 8", \
          "entry": 11, \
          "instance": 7, \
          "type": "pad", \
          "channel": 0, \
          "midicc": 147, \
          "program": 49, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "name": "LOOP", \
          "entry": 12, \
          "instance": 0, \
          "type": "transport", \
          "channel": 0, \
          "midicc": 146, \
          "program": 20, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "name": "REW", \
          "entry": 13, \
          "instance": 1, \
          "type": "transport", \
          "channel": 0, \
          "midicc": 146, \
          "program": 21, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "name": "FF", \
          "entry": 14, \
          "instance": 2, \
          "type": "transport", \
          "channel": 0, \
          "midicc": 146, \
          "program": 22, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "name": "STOP", \
          "entry": 15, \
          "instance": 3, \
          "type": "transport", \
          "channel": 0, \
          "midicc": 146, \
          "program": 23, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "name": "PLAY", \
          "entry": 16, \
          "instance": 4, \
          "type": "transport", \
          "channel": 0, \
          "midicc": 146, \
          "program": 24, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "name": "REC", \
          "entry": 17, \
          "instance": 5, \
          "type": "transport", \
          "channel": 0, \
          "midicc": 146, \
          "program": 25, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "name": "D37", \
          "entry": 18, \
          "instance": 0, \
          "type": "button", \
          "channel": 0, \
          "midicc": 146, \
          "program": 32, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "name": "D38", \
          "entry": 19, \
          "instance": 1, \
          "type": "button", \
          "channel": 0, \
          "midicc": 146, \
          "program": 33, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "name": "D39", \
          "entry": 20, \
          "instance": 2, \
          "type": "button", \
          "channel": 0, \
          "midicc": 146, \
          "program": 34, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "name": "D40", \
          "entry": 21, \
          "instance": 3, \
          "type": "button", \
          "channel": 0, \
          "midicc": 146, \
          "program": 35, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "name": "D41", \
          "entry": 22, \
          "instance": 4, \
          "type": "button", \
          "channel": 0, \
          "midicc": 146, \
          "program": 36, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "name": "D42", \
          "entry": 23, \
          "instance": 5, \
          "type": "button", \
          "channel": 0, \
          "midicc": 146, \
          "program": 37, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "name": "D43", \
          "entry": 24, \
          "instance": 6, \
          "type": "button", \
          "channel": 0, \
          "midicc": 146, \
          "program": 38, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "name": "D44", \
          "entry": 25, \
          "instance": 7, \
          "type": "button", \
          "channel": 0, \
          "midicc": 146, \
          "program": 39, \
          "msb": 127, \
          "lsb": 0 \
        }, \
        { \
          "name": "D45", \
          "entry": 26, \
          "instance": 8, \
          "type": "button", \
          "channel": 0, \
          "midicc": 146, \
          "program": 40, \
          "msb": 127, \
          "lsb": 0 \
        } \
      ] \
    } \
  ] \
}'


const obj = JSON.parse(json);

module.exports = {obj}