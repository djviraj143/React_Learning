import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState, setProjectedState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handleAddTask(text) {
    setProjectedState(prevState => {
      const taskId = Math.random(3);
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      }
    })
  }

  function handleDeleteTask(id) {
    setProjectedState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id)
      };
    });
  }

  function handleStartAddProject() {
    setProjectedState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }
  
  function handelCancelAddProject() {
    setProjectedState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }
  
  function handleSelectProject(id) {
    setProjectedState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectedState(prevState => {
      const projectId = Math.random(3);
      const newProject = {
        ...projectData,
        id: projectId
      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }
    })
  }

  function handleDeleteProject() {
    setProjectedState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId)
      };
    });
  }

  // console.log(projectState);

  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId);

  let content = <SelectedProject
                  project={selectedProject}
                  onDelete={handleDeleteProject}
                  onAddTask={handleAddTask}
                  onDeleteTask={handleDeleteTask}
                  tasks={projectState.tasks}
                />;

  if(projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handelCancelAddProject} />
  } else if(projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  } else {

  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar 
        onStartAddProject={handleStartAddProject}
        onSelectProject={handleSelectProject}
        projects={projectState.projects}
        selectedProjectId={projectState.selectedProjectId}
      />
      {content}
      {/* <h1 className="my-8 text-center text-5xl font-bold">Hello World</h1> */}
    </main>
  );
}

export default App;
