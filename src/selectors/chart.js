import { createSelector } from "reselect";
import _ from "underscore";
import { getSelectedLanguages } from "./language";

const selectData = state => state.chart.data;

/**
 * Group total websites views by language.
 *
 * @param data Array<{
 *  tags: Array<{name: string}>;
 *  url: string;
 *  website_views: Array<{ date: string, count: string}>
 * }>
 * @param languages Array<{name: string, displayed: bool}>
 *
 * Return: Array<{ language: string, views: number }>
 */
export const groupByLanguage = createSelector(
  [selectData, getSelectedLanguages],
  (data, languages) => {
    // TODO: Implement
    console.log('function called')
    let languagesObj = {}
    languages.map(l => {
      languagesObj[l.name] = 0 
    })
    data.map((d) => {
      console.log('mapping over data', d)
      let count = 0
      d.tags.map((t) => {
        console.log('Tag Name', t.name, languagesObj)
        if (t.name in languagesObj) {
          console.log('MATCH')
          d.website_views.map(view => {
            count += parseInt(view.count)
          })
          languagesObj[t.name] += count
        }
      })
    })
    let toReturn = []
    for (const [key, value] of Object.entries(languagesObj)) {
      toReturn.push({language: key, views: value})
    }
    console.log(toReturn)
    return toReturn
  }
);

/**
 * Flattened list of daily views.
 *
 * @param data Array<{
 *  tags: <{name: string}>;
 *  url: string;
 *  website_views: Array<{ date: string, count: number}>
 * }>
 * @param languages Array<{name: string, displayed: bool}>
 *
 *
 * Return: Array<{
 *    count: number;
 *    date: string;
 *    website: string;
 * }>
 */
export const flattenWebsiteViews = createSelector(
  [selectData, getSelectedLanguages],
  (data, languages) => {
    return _.flatten(
      data
        .filter(
          website =>
            website.tags.filter(tag =>
              languages.map(lang => lang.name).includes(tag.name)
            ).length > 0
        )
        .map(website =>
          website.website_views.map(views => {
            return {
              count: views.count,
              date: views.date,
              website: website.url
            };
          })
        )
    );
  }
);
