/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package refraction;

/**
 *
 * @author Kit
 */
public class Refraction {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        double surfaceData[] = new double[]{-2.0, -4.0, -2.0};
        Vector surfaceNormal = new Vector(surfaceData);
        
        double incidentData[] = new double[]{5.0, 5.0, 5.0};
        Vector incidentVector = new Vector(incidentData);
        
        double check = -(surfaceNormal).dot(incidentVector);
        System.out.println(check);
        
        double eta[] = new double[]{1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1};
        
        for(int i = 0; i < eta.length - 1; i++){
            System.out.println(eta[i] + "/" + eta[i+1]);
            double etaTemp = eta[i]/eta[i+1];
            
            double k = 1.0 - etaTemp * etaTemp * (1.0 - surfaceNormal.dot(incidentVector) * surfaceNormal.dot(incidentVector));
            
            Vector R = (incidentVector.times(etaTemp)).minus(surfaceNormal.times(etaTemp * surfaceNormal.dot(incidentVector) + Math.sqrt(k)));
            
            System.out.println(R.toString());
            
            incidentVector = R;
        }
        
        System.out.println("BREAK");
        
        for(int i = 9; i > 1; i--){
            System.out.println(eta[i] + "/" + eta[i-1]);
            double etaTemp = eta[i]/eta[i - 1];
            
            double k = 1.0 - etaTemp * etaTemp * (1.0 - surfaceNormal.dot(incidentVector) * surfaceNormal.dot(incidentVector));
            
            Vector R = (incidentVector.times(etaTemp)).minus(surfaceNormal.times(etaTemp * surfaceNormal.dot(incidentVector) + Math.sqrt(k)));
            
            System.out.println(R.toString());
            
            incidentVector = R;
        }
        
        
    }
    
}
