const fieldStyle = { width: "70%", marginLeft: "12%" };
export function styledInputComponent<P>(
  WrappedComponent: React.ComponentType<P>
) {
  const ComponentWithExtraInfo = (props: P) => {
    return <WrappedComponent {...props} sx={fieldStyle} />;
  };
  return ComponentWithExtraInfo;
}
export default styledInputComponent;
