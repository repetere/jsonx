import * as jsonx from './index';
import path from 'path';

describe('express', function(){
  describe('__express',()=>{
    it('should render from a json file', ()=>{
      const template:string = jsonx.__express(path.resolve('./src/mock/simple_template.jxm.json')) as string
      expect(template.includes('from external template')).toBe(true)
    })
    it('should render from a js file', ()=>{
      const template:string = jsonx.__express(path.resolve('./src/mock/simple_template.jxm.js')) as string
      expect(template.includes('first')).toBe(true)
    })
    it('should render from a jsm object', ()=>{
      const template:string = jsonx.__express(undefined,{__jsonx:{div:"hello world!"}}) as string
      expect(template.includes('hello world')).toBe(true)
    })
    it('should return html string with a callback', (done)=>{
      jsonx.__express(undefined, {__jsonx:{div:"hello world!"}}, (err:Error,template:string)=>{
        expect(err).toBe(null)
        expect(template.includes('hello world')).toBe(true)
        done()
      })
    })
    it('should handle errors', (done)=>{
      expect(()=>{
        jsonx.__express(path.resolve('./src/mock/error_test.json'),{})
      }).toThrow('Unexpected token')

      jsonx.__express(path.resolve('./src/mock/error_test.json'),{},(err:Error, template:string)=>{
        expect(err).toBeInstanceOf(Error)
        done()
      })
    })
    it('should load external templates', ()=>{
      const template:string = jsonx.__express(path.resolve('./src/mock/test_template.jxm.json')) as string
      const simple_template:string = jsonx.__express(path.resolve('./src/mock/simple_test_template.jxm.json')) as string
      expect(template).toMatch('<!DOCTYPE html>\n' +
      '<div data-reactroot=""><div>this is in the main template</div><div title="testing templates"><div>from external template</div></div></div>');
      expect(simple_template).toMatch(`<!DOCTYPE html>
<main data-reactroot=""><div>this is in the simple template</div><section title="testing simple templates"><div>from external template</div></section></main>`)
    })
  })
})