import { visit } from 'unist-util-visit';

export default ()=>{
  return (tree)=>{
    visit(tree, "code", node => {
      console.log(node)
    })
  }
}