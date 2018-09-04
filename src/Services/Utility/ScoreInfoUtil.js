import React from "react";
import  ScoreInfos from "../Constants/ScoreInfos"
import { isNullOrUndefined } from "./Util";
export class ScoreInfoUtil {

    static findScoreInfo(gradeDisplay) {
        return ScoreInfos.data.find(scoreInfo => scoreInfo.name === gradeDisplay);
    }


    static findClassNameByName(gradeDisplay) {
        if (!isNullOrUndefined(gradeDisplay)) {
            const scoreInfo = ScoreInfoUtil.findScoreInfo(gradeDisplay);
            if (!isNullOrUndefined(scoreInfo))
                return scoreInfo.className;
        }
        return "";
    }


}