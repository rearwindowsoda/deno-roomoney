import { MutableRef, useEffect, useRef } from "preact/hooks";
import { JSX } from "preact";



interface MainAlertProps {
	message: string;
}
 
function MainAlert(props: MainAlertProps) {
	const alertRef = useRef(null);
	useEffect(() => {
    const alertTimeout = setTimeout(() => {
			if(alertRef.current) {
				(alertRef.current as any).style.visibility = "hidden";
			} // Preact types would work here in current version. 
    }, 3000);
    return () => {
      clearTimeout(alertTimeout);
    };
  }, []);
	return (
		<>
		<div ref={alertRef} class={"alert alert-dismissible alert-danger"}>
  <strong>Oh snap!</strong> <span>{props.message}</span>
</div>
<div></div>
</>
	)
}

export default MainAlert;