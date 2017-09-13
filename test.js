require('chromedriver');
let webdriver = require('selenium-webdriver');
let driver;
let By = webdriver.By;
let fs = require('fs');
let path = require('path')
let rootpath = getRootPath();

function getRootPath() {
    let rootPath = path.resolve(__dirname);
    while (rootPath) {
        if (fs.existsSync(rootPath + '/package.json')) {
            break;
        }
        rootPath = rootPath.substring(0, rootPath.lastIndexOf(path.sep));
    }
    return rootPath;
}
describe('登录',function(){
    this.timeout(60000);

    describe('测试上传附件',function(){
        before(async function(){
            driver = new webdriver.Builder().forBrowser('chrome').build();
            driver.manage().window().maximize();
            await driver.get('http://192.168.150.128:3000/signin');
            await driver.findElement(By.id('name')).sendKeys('jason-yy');
            await driver.findElement(By.id('pass')).sendKeys('Yy456123');
            await driver.findElement(By.css('#signin_form > div.form-actions > input')).click();
        })
        // after(async function(){
        //     let user = new Date().valueOf();
        //     await driver.takeScreenshot().then(function (imagedata) {
        //         fs.writeFileSync(rootpath + "/jietu/" + user + '.png', imagedata, 'base64')
        //     })
        //     await driver.quit();
        // })
            it('点击发布话题',async function(){
                await driver.findElement(By.id('create_topic_btn')).click();
            });
            it('选择板块', async function () {
                await driver.findElement(By.id('tab-value')).click();
            });
            it('选择分享', async function () {
                await driver.findElement(By.xpath('//*[@id="tab-value"]/option[2]')).click();
            });
            it('输入标题', async function () {
                await driver.findElement(By.id('title')).sendKeys('江疏影的老公')
            });
            it('点击输入框输入内容', async function () {
                await driver.findElement(By.className('CodeMirror-scroll')).click();
                await driver.actions().mouseMove(driver.findElement(By.className('CodeMirror-scroll'))).sendKeys('感觉这个帖子要火').perform();
            });
            it('点击上传图片',async function(){
                await driver.findElement(By.className('eicon-image')).click();
                await driver.findElement(By.name('file')).sendKeys('D:\\tupian\\','xiaoshuaige.jpg');
            })
            it('点击提交',async function(){
                await driver.actions().mouseMove(driver.findElement(By.xpath('//*[@id="create_topic_form"]/fieldset/div/div/div[4]/input'))).click();
              
            })
        });

    })