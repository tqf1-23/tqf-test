describe('add todo', function () {
    let page;

    before (async function () {
      page = await browser.newPage();
      await page.goto('http://127.0.0.1:7001/');
    });
  
    after (async function () {
      await page.close();
    });

    it('should have correct title', async function() {
        expect(await page.title()).to.eql('Koa • Todo');
    })
    
    it('should new todo correct', async function() {
      await page.click('#new-todo', {delay: 500});
      await page.type('#new-todo', 'new todo item', {delay: 50});
      await page.keyboard.press("Enter");
      let todoList = await page.waitFor('#todo-list');
      const expectInputContent = await page.evaluate(todoList => todoList.lastChild.querySelector('label').textContent, todoList);
      expect(expectInputContent).to.eql('new todo item');
    }) 

    it('should completed todo correct', async function() {
      page.evaluate(() => {
        let elements = document.getElementsByClassName('toggle');
        elements[elements.length - 1].click();
        console.log(elements.length - 1);
      });
      let todoList = await page.waitFor('#todo-list');
      const expectStatus = await page.evaluate(todoList => todoList.lastChild.querySelector('input').checked, todoList);
      expect(expectStatus).to.eql(true);
  })

  it('should delete todo correct', async function() {
  await page.click('#new-todo', {delay: 500});
  await page.type('#new-todo', 'new todo item', {delay: 50});
  await page.keyboard.press("Enter");
  const todoListLength_1 = await page.evaluate(() => {
      return document.getElementsByClassName('toggle').length;
  });
  await page.evaluate(()=> {
    document.querySelector('.destroy').click()
  });
  const todoListLength_2 = await page.evaluate(() => {
    return document.getElementsByClassName('toggle').length;
});
expect(todoListLength_2 - todoListLength_1).eql(1);
})

    
  });