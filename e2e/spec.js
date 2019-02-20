const urls =[1,2,3,4,5];
const moment = require('moment');
const using =require('jasmine-data-provider');
const columns =require('./columns').cols();
const excelbuilder = require('msexcel-builder');
const AxeBuilder = require('axe-webdriverjs');
const axeResults =[];
let current_date =moment(new Date()).format('hh-mm-ss__DD_MM_YY');
console.log(`current date: ${current_date}`);
const workbook =excelbuilder.createWorkbook('reports', `report ${current_date}.xlsx`);
let sheet1;
let analyzed_url;
let model_number;
describe('my first test', () => {
    beforeAll(() => {
        browser.waitForAngularEnabled(false);
    });

    afterEach(() => {
        let row=1;
        sheet1 = workbook.createSheet(`sheet${model_number}`, 11, 768);
        for (let col in columns) {
            if (col !== undefined) {
                sheet1.set(columns[col], 1, col);
            }
        }
        row++;

        axeResults.forEach(function(result, number) {
            sheet1.set(columns.analyzed_url, row, analyzed_url);
            sheet1.set(columns.actual_slide_num, row, number+1);
            sheet1.set(columns.displayed_slide_num, row, result.displayed_slide_number);
            sheet1.set(columns.violations, row, result.violations.length);
            for (v of result.violations) {
                sheet1.set(columns.rule_id, row, v.id);
                sheet1.set(columns.description, row, v.description);
                sheet1.set(columns.help, row, v.help);
                sheet1.set(columns.helpUrl, row, v.helpUrl);
                sheet1.set(columns.impact, row, v.impact);
                sheet1.set(columns.tags, row, v.tags.join());
                sheet1.set(columns.nodes_html, row, v.nodes
                    .map(node => node.html).join());
                row++;
            }    
        });
    });

    afterAll((done) => {
        workbook.save(function(err){
        if (err)
            throw err;
        else
            console.log('congratulations, your workbook created');
            done();
        });
    });

    using(urls, (id) => {
        it("shold be no", async () => {
model_number =id;
            let current_url=browser.baseUrl+id;
            console.log(current_url);
            await browser.get(current_url);
            const nextButton =element(by.buttonText('Next'));
            const continueButtonList =element.all(by.buttonText('Continue'));
            while (true) {
                let displayed_slide_number =await element(by.id('info')).getText();
                let result =await AxeBuilder(browser).analyze();
                result.displayed_slide_number =displayed_slide_number;
                axeResults.push(result);
                if (await nextButton.getAttribute('disabled') !== null) {
                    analyzed_url =current_url;
                    break;
                }
                else {
                    nextButton.click();
                    continueButtonList.each(async (continueButton, index) => {
                        if (await continueButton.isDisplayed()) {
                            continueButton.click();
                        }
                    });
                }
            }
        });
    });
});