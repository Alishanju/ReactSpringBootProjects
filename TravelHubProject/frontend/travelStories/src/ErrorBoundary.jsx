import { Component } from "react";

 class ErrorBoundary extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            hasError:false,
            error: null,
          errorInfo: null
            
        };

    }


    static getDerivedStateFromError(error){
        return {hasError:true,error};

    }


    componentDidCatch(error,errorInfo){
        console.log("Error Caught by Error Boundary:",error,errorInfo);
        this.setState({
      error,
      errorInfo
    });
    }


    render(){
        if(this.state.hasError){
            return <div className="ml-20 mt-20 w-screen">
                <h1 className="text-red-600 text-3xl font-bold">Something went Wrong</h1>
                 <p className="text-2xl">{this.state.error?.toString()}</p>
                 <pre className="text-xl">{this.state.errorInfo?.componentStack}</pre>
                </div>
        }

        return this.props.children
    }
 }

 export default ErrorBoundary;