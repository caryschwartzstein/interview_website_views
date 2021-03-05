import React from "react";
import { useSelector } from "react-redux";
import _ from "underscore";
import { getLanguages } from "../../selectors/language";
import Checkbox from "./Checkbox";

export function Languages() {
  const languages = useSelector(getLanguages);

  return (
    <div>
      <div>
        {_.map(languages, language => {
          return (
            <>
            {
              (language.name === 'English' || language.name === 'French') &&
              <Checkbox
                displayed={true}
                language={language}
                key={language.name}
              />
            }
            </>
          );
        })}
      </div>
    </div>
  );
}
