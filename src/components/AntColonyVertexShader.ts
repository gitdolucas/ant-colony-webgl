export const AntColonyVertexShader = `
uniform float time;
uniform int numAnts;

void main() {
  vec3 newPosition = position;

  // Calculate the position of each ant
  int index = int(gl_InstanceID);
  float angle = 2.0 * 3.14159 * float(index) / float(numAnts);
  newPosition.x += 5.0 * cos(angle);
  newPosition.z += 5.0 * sin(angle);

  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPosition, 1.0);
}
`;
