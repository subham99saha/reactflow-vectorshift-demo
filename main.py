from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

class PipeBase(BaseModel):
    nodes: object
    edges: object

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipeBase):
    print(pipeline)

    def create_adj_dict(edges: object):
        adj = {}
        for edge in edges:
            if edge['source'] in adj:
                adj[edge['source']].append(edge['target'])
            else:
                adj[edge['source']] = [edge['target']]
        return adj

    adj_dict = create_adj_dict(pipeline.edges)

    def check_cyclic(nodes: object):
        nodes_list = list(nodes); visiting = []; visited = []
        while nodes_list:                        
            if dfs(nodes_list[0]['id'],visiting,visited):
                return True
            nodes_list.pop(0)
        return False


    def dfs(node_id: str, visiting: object, visited: object):
        if node_id not in visited:
            visiting.append(node_id)
            if node_id in adj_dict:
                for adjn in adj_dict[node_id]:
                    if adjn in visiting:
                        return True
                    else:
                        if dfs(adjn,visiting,visited):
                            return True 
            visiting.remove(node_id)
            visited.append(node_id) 
        return False 
            
    is_dag = not check_cyclic(pipeline.nodes)

    return {
        'num_nodes': len(pipeline.nodes), 
        'num_edges': len(pipeline.edges),
        'is_dag': is_dag
    }
