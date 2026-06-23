// @spec JSONX-CORE-009 JSONX-COMP-006 JSONX-COMP-010 JSONX-COMP-012
// @intent docs/intent/core-rendering/core-rendering-specs.md docs/intent/component-factories/component-factories-specs.md
import { execFileSync } from 'child_process';
import path from 'path';

function runHtmlScenario(scenario: string): void {
  execFileSync(process.execPath, [
    path.resolve(__dirname, 'html.test.runner.cjs'),
    scenario,
  ], {
    stdio: 'pipe',
  });
}

describe('End to End HTML Tests', function(){
  describe('Functional Component Test',()=>{
    it('should render the page', ()=>{
      runHtmlScenario('functional');
    },30000)
  })
  describe('Dynamic Component Test',()=>{
    it('should render the page', ()=>{
      runHtmlScenario('dynamic');
    },30000)
  })
  describe('Basic Component Test',()=>{
    it('should render the page', ()=>{
      runHtmlScenario('basic-form');
    },30000)
  })
  describe('Advanced Form Test',()=>{
    it('should render the page', ()=>{
      runHtmlScenario('advanced-form');
    },30000)
  })
  describe('Custom Components Sytanx Test',()=>{
    it('should render the page', ()=>{
      runHtmlScenario('custom-components');
    },30000)
  })
  describe('Simple Sytanx Test',()=>{
    it('should render the page', ()=>{
      runHtmlScenario('simple-syntax');
    },30000)
  })
})
