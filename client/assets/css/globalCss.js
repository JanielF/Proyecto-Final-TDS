import { StyleSheet } from 'react-native';
const globalStyles = StyleSheet.create({
    background: {
        flex:1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
  container : {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 10,
    color: '#E2ECF4',
    textAlign: 'center',
  },
  description: {
    fontWeight: '300',
    color: '#E2ECF4',
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
    maxWidth: '90%',
    marginLeft: 'auto',
    textAlign: 'center',
    paddingHorizontal: 64,
  },
  paginator:{
    flexDirection: 'row',
    height: 64,
  },
  subtitule:{
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
    color: '#666',
  },
  inputlogin: {
    height: 40,
    width: 280,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  buttonlog: {
    backgroundColor: '#6DACC8',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    marginBottom: 12,
    alignItems: 'center',
  },
  registerButtonlog: {
    backgroundColor: '#33BF7B',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    marginBottom: 12,
    alignItems: 'center',
  },
  buttonTextlog: {
    color: 'white',
    width: 120,
    fontSize: 16,
    textAlign: 'center',
  },
  /*Parte del boton de editar */
  subtituleLog:{
    fontSize: 16,
    width: 120,
    marginBottom: 16,
    textAlign: 'center',
    color: '#000000',
    width: 250
  },
});

export default globalStyles;
