export default function Car({params}) {
  const {vin} = params;
  return (<h1>Matricula: {vin}</h1>);
}
