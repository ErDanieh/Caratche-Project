// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

library CarData {
    struct Repair {
        string repairType;
        uint repairDate;
        string description;
    }

    struct Accident {
        string accidentType;
        uint accidentDate;
        string description;
    }
}
