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
        double surfaceData[] = new double[]{-500.0, -250.0, 0.0};
        Vector surfaceNormal = new Vector(surfaceData);
        
        double incidentData[] = new double[]{150.0, 50.0, 0.0};
        Vector incidentVector = new Vector(incidentData);
        
        incidentVector = incidentVector.direction();
        
        double check = -(surfaceNormal).dot(incidentVector);
        System.out.println(check);
        
        double eta[] = new double[]{1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1};
        
        for(int i = 0; i < eta.length - 1; i++){
            System.out.println(eta[i] + "/" + eta[i+1]);
            double etaTemp = eta[i]/eta[i+1];
            
            double k = 1.0 - etaTemp * etaTemp * (1.0 - surfaceNormal.dot(incidentVector) * surfaceNormal.dot(incidentVector));
            
            System.out.println(k);
            
            Vector R = (incidentVector.times(etaTemp)).minus(surfaceNormal.times(etaTemp * surfaceNormal.dot(incidentVector) + Math.sqrt(k)));
            
            System.out.println(R.toString());
            
            incidentVector = R;
        }
        
        System.out.println("BREAK");
        
        for(int i = 9; i > 1; i--){
            System.out.println(eta[i] + "/" + eta[i-1]);
            double etaTemp = eta[i]/eta[i - 1];
            
            double k = 1.0 - etaTemp * etaTemp * (1.0 - surfaceNormal.dot(incidentVector) * surfaceNormal.dot(incidentVector));
            
            System.out.println(k);
            
            Vector R = (incidentVector.times(etaTemp)).minus(surfaceNormal.times(etaTemp * surfaceNormal.dot(incidentVector) + Math.sqrt(k)));
            
            System.out.println(R.toString());
            
            incidentVector = R;
        }
        
        double surfaceData2[] = new double[]{-500.0, -250.0, 0.0};
        surfaceNormal = new Vector(surfaceData2);
        
        double incidentData2[] = new double[]{150.0, 50.0, 0.0};
        incidentVector = new Vector(incidentData2);
        
        System.out.println("START OF NEXT METHOD");
        
        double positiveSigma = -incidentVector.dot(surfaceNormal) + Math.sqrt(Math.pow(incidentVector.dot(surfaceNormal), 2.0) + (1 - incidentVector.dot(incidentVector)));
        double negativeSigma = -incidentVector.dot(surfaceNormal) - Math.sqrt(Math.pow(incidentVector.dot(surfaceNormal), 2.0) + (1 - incidentVector.dot(incidentVector)));
        
        Vector positiveR = incidentVector.plus(surfaceNormal.times(positiveSigma));
        Vector negativeR = incidentVector.plus(surfaceNormal.times(negativeSigma));
        
        System.out.println(positiveR.toString());
        System.out.println(negativeR.toString());
        
        incidentVector = positiveR;
        
        for(int i = 0; i < eta.length - 1; i++){
            System.out.println(eta[i] + "/" + eta[i+1]);
            double etaTemp = eta[i]/eta[i+1];
            
            double k = 1.0 - etaTemp * etaTemp * (1.0 - surfaceNormal.dot(incidentVector) * surfaceNormal.dot(incidentVector));
            
            System.out.println(k);
            
            Vector R = (incidentVector.times(etaTemp)).minus(surfaceNormal.times(etaTemp * surfaceNormal.dot(incidentVector) + Math.sqrt(k)));
            
            System.out.println(R.toString());
            
            incidentVector = R;
        }
        
        System.out.println("BREAK");
        
        for(int i = 9; i > 1; i--){
            System.out.println(eta[i] + "/" + eta[i-1]);
            double etaTemp = eta[i]/eta[i - 1];
            
            double k = 1.0 - etaTemp * etaTemp * (1.0 - surfaceNormal.dot(incidentVector) * surfaceNormal.dot(incidentVector));
            
            System.out.println(k);
            
            Vector R = (incidentVector.times(etaTemp)).minus(surfaceNormal.times(etaTemp * surfaceNormal.dot(incidentVector) + Math.sqrt(k)));
            
            System.out.println(R.toString());
            
            incidentVector = R;
        }
        
        double negativeSigma2 = -incidentVector.dot(surfaceNormal) - Math.sqrt(Math.pow(incidentVector.dot(surfaceNormal), 2.0) + (1 - incidentVector.dot(incidentVector)));
        Vector negativeR2 = incidentVector.plus(surfaceNormal.times(negativeSigma2));
        
        System.out.println(negativeR2);
    }
    
}
